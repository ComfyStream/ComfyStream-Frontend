import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { EventoService } from "src/app/services/evento.service";
import { UsuarioService } from "src/app/services/usuario.service";
import { environment } from "src/environments/environment";
import { AngularFireStorage } from "@angular/fire/storage";
import { CargaImagenesService } from "src/app/services/carga-imagenes.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";


const base_url = environment.apiUrl;

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent implements OnInit {
  
  public usuario:any;
  public crearEventoForm: FormGroup;
  public imagenSubir: File;
  public imgTemp: any = null;
  public urlImagen:string;
  public enlazadoZoom = false;
  public zoom:string;
  public formatoNoValido:boolean = false;

  constructor(private fb:FormBuilder,
    private router: Router,
    private usuarioService:UsuarioService,
    private eventoService:EventoService,
    private cargaImagenService:CargaImagenesService) { }

  async ngOnInit() {
  this.enlazadoZoom = await this.usuarioService.zoomEnlazado();
    this.crearEventoForm = this.fb.group({
      titulo:['', [Validators.required]],
      descripcion:['', [Validators.required]],
      categoria:['', [ Validators.required] ],
      subCategoria:[''],
      esPersonal:[false],
      fecha:['', [Validators.required, this.fechaPosteriorAHoy]],
      precio:['', [Validators.required, this.valorPositivo]],
      duracion:['', [Validators.required, this.valorPositivo]],
      img:[,[Validators.required]]
    });

    this.usuario = await this.usuarioService.getUsuario()

  }

  cambiarImagen( event ) {
    const file = event.target.files[0];
    if(!file.type.includes('image')){
      this.formatoNoValido = true;

    }else{
      this.imagenSubir = file;
      this.formatoNoValido = false;
    }
    

    
    
    }

    async enlazarCuenta(){
    
      this.router.navigateByUrl('/mi-cuenta');
  
  
    }
  async crearEvento(){
    if(this.crearEventoForm.invalid || this.formatoNoValido){
      this.crearEventoForm.markAllAsTouched()
      return;
    }
    if(this.enlazadoZoom){

      Swal.showLoading();
    
      await this.subirImagen();

      const datos = this.crearEventoForm.value;
      delete datos.img;
    
      console.log(datos);
      const resultado = await this.eventoService.crearSalaZoom(datos);
      if(resultado != "error"){
         const evento =  await this.eventoService.crearEvento(datos, this.urlImagen);
         const data = {
           idReunion : resultado,
           eventoId : evento._id
         }
        const añadido = await this.eventoService.añadirIdEvento(data);
        if(añadido != "200 Ok"){
          Swal.fire('Error ',añadido, 'error')
        }

      }else{
        
        Swal.fire('Error de Zoom',"Desvincule y vuelva a vincular su cuenta de Zoom", 'error');
        this.router.navigateByUrl("/mi-cuenta")
        return;
      }
     
      

      Swal.fire('Evento creado con éxito', '', 'success');
      this.router.navigate(['/mis-eventos']);
    }else{
      Swal.fire('Error', 'Para crear un evento debe tener enlazado Zoom', 'error');
    }
  }

  async subirImagen(){
    let nombre = Math.random().toString() + this.imagenSubir.name; 
    await this.cargaImagenService.subirCloudStorage(nombre, this.imagenSubir);
    this.urlImagen = await this.cargaImagenService.referenciaCloudStorage(nombre)
  }



  //Validaciones
  get tituloNoValido(){
    return this.tituloCampoRequerido
  }
  get tituloCampoRequerido(){
    return this.crearEventoForm.get('titulo').errors ? this.crearEventoForm.get('titulo').errors.required && this.crearEventoForm.get('titulo').touched : null
  }

  get descripcionNoValido(){
    return this.descripcionCampoRequerido
  }
  get descripcionCampoRequerido(){
    return this.crearEventoForm.get('descripcion').errors ? this.crearEventoForm.get('descripcion').errors.required && this.crearEventoForm.get('descripcion').touched : null
  }

  get categoriaNoValido(){
    return this.categoriaCampoRequerido
  }
  get categoriaCampoRequerido(){
    return this.crearEventoForm.get('categoria').errors ? this.crearEventoForm.get('categoria').errors.required && this.crearEventoForm.get('categoria').touched : null
  }

  get precioNoValido(){
    return this.precioRequerido || this.precioPositivo
  }
  get precioRequerido(){
    return this.crearEventoForm.get('precio').errors ? this.crearEventoForm.get('precio').errors.required && this.crearEventoForm.get('precio').touched : null
  }
  get precioPositivo(){
    return this.crearEventoForm.get('precio').errors ? this.crearEventoForm.get('precio').errors.valorPositivo && this.crearEventoForm.get('precio').touched : null
  }

  get fechaNoValido(){
    return this.fechaCampoRequerido || this.fechaFechaPosteriorAHoy || this.fechaFormatoNoValido
  }
  get fechaCampoRequerido(){
    return this.crearEventoForm.get('fecha').errors ? this.crearEventoForm.get('fecha').errors.required && this.crearEventoForm.get('fecha').touched : null
  }
  get fechaFechaPosteriorAHoy(){
    return this.crearEventoForm.get('fecha').errors ? this.crearEventoForm.get('fecha').errors.fechaPosteriorAHoy && this.crearEventoForm.get('fecha').touched : null
  }
  get fechaFormatoNoValido(){
    return this.crearEventoForm.get('fecha').errors ? this.crearEventoForm.get('fecha').errors.fechaFormatoNoValido && this.crearEventoForm.get('fecha').touched : null
  }

  get duracionNoValido(){
    return this.duracionRequerido || this.duracionPositivo
  }
  get duracionRequerido(){
    return this.crearEventoForm.get('duracion').errors ? this.crearEventoForm.get('duracion').errors.required && this.crearEventoForm.get('duracion').touched : null
  }
  get duracionPositivo(){
    return this.crearEventoForm.get('duracion').errors ? this.crearEventoForm.get('duracion').errors.valorPositivo && this.crearEventoForm.get('duracion').touched : null
  }

  get imgNoValido(){
    return this.imgCampoRequerido
  }
  get imgCampoRequerido(){
    return this.crearEventoForm.get('img').errors ? this.crearEventoForm.get('img').errors.required && this.crearEventoForm.get('img').touched : null
  }

  private fechaPosteriorAHoy(control:FormControl):{[s:string]:boolean}{
    let f = Date.parse(control.value)
    let hoy = new Date().getTime()
    if(f < hoy){
      return {
        fechaPosteriorAHoy:true
      }
    }
    const isFirefox = navigator.userAgent.indexOf('Firefox') != -1
    if(isFirefox){
      if(!control.value.match("^([0]{0,1}[1-9]|1[012])/([1-9]|([012][0-9])|(3[01]))/\\d\\d\\d\\d (20|21|22|23|[0-1]?\\d):[0-5]?\\d$")){
        return {
          fechaFormatoNoValido:true
        }
      }
    }
    return null
  }

  private valorPositivo(control:FormControl):{[s:string]:boolean}{
    if(control.value < 1){
      return {
        valorPositivo:true
      }
    }
    return null
  }



  
}
