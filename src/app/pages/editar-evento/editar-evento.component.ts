import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventoService } from 'src/app/services/evento.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';
import { ActivatedRoute } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import { Usuario } from '../../models/usuario';
import { AsistenciaService } from '../../services/asistencia.service';

const base_url = environment.apiUrl;

@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.css']
})
export class EditarEventoComponent implements OnInit {

  public usuario:any;
  public eventoId: string;
  public evento: Evento;
  public editarEventoForm: FormGroup;
  public imagenSubir: File;
  public urlProfesional: string;
  public imgTemp: any = null;
  public activo= false;
  public urlImagen:string;
  public eventoPasado: boolean = false;
  public asistentes: Usuario[] =[];
  public editable=false;

  constructor(private fb:FormBuilder,
    private activatedRoute: ActivatedRoute,
    private usuarioService:UsuarioService,
    private eventoService:EventoService,
    private asistenciaService: AsistenciaService,
    private cargaImagenService:CargaImagenesService) { }

  async ngOnInit() {
      this.usuario = await this.usuarioService.getUsuario();
      this.activatedRoute.params.subscribe( (params) => {
        this.eventoId = params['id']; 
      });
      this.evento = await this.eventoService.getEventoPorID(this.eventoId);
      this.eventoAntiguo()
      await this.datosEvento();
      this.asistentes = await this.eventoService.asistentesAlEvento(this.eventoId);
      if(this.evento.profesional === this.usuario._id && (this.asistentes.length == 0)  && !this.eventoPasado)
            this.editable = true;
      this.editarEventoForm = this.fb.group({
        titulo:[this.evento.titulo, [Validators.required]],
        descripcion:[this.evento.descripcion, [Validators.required]],
        categoria:[this.evento.categoria, [ Validators.required] ],
        subCategoria:[this.evento.subCategoria],
        esPersonal:[this.evento.esPersonal, [Validators.required]],
        precio:[this.evento.precio, [Validators.required, this.valorPositivo]],
        img:[]
      });


               
  }

  async editarEvento(){
    if(this.editarEventoForm.invalid){
      this.editarEventoForm.markAllAsTouched()
      return;
    }
    if(this.editarEventoForm.controls['img'].value){
      await this.subirImagen();
    }
    
    const datos = this.editarEventoForm.value;
    delete datos.img;
    
    if(this.editarEventoForm.controls['img'].value){
      const evento =  await this.eventoService.actualizarEvento(datos, this.eventoId, this.urlImagen);
    }else{
      const evento =  await this.eventoService.actualizarEvento(datos, this.eventoId, this.evento.img);
    }
    

  }

  async datosEvento(){
      const datosReunion = await this.asistenciaService.getDatosReunion(this.eventoId);
      if(datosReunion!=null){
        const usuarioId = localStorage.getItem("usuarioId");
        if( usuarioId == datosReunion.userId ){
          this.urlProfesional = datosReunion.start_url;
        }
        const horaComienzo = new Date (datosReunion.start_time);
        const hoy = new Date();
        if(Math.floor(Math.abs(horaComienzo.getTime() - hoy.getTime())/36e5)<=1){
            this.activo= true;
        }
      }  
  }

  eventoAntiguo(){
    let hoy = new Date().getTime();
    let fecha = new Date(this.evento.fecha).getTime();
    if(fecha < hoy){
      this.eventoPasado = true;
    }
  }

  cambiarImagen( event ) {
    const file = event.target.files[0];
    this.imagenSubir = file;
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
    return this.editarEventoForm.get('titulo').errors ? this.editarEventoForm.get('titulo').errors.required && this.editarEventoForm.get('titulo').touched : null
  }

  get descripcionNoValido(){
    return this.descripcionCampoRequerido
  }
  get descripcionCampoRequerido(){
    return this.editarEventoForm.get('descripcion').errors ? this.editarEventoForm.get('descripcion').errors.required && this.editarEventoForm.get('descripcion').touched : null
  }

  get categoriaNoValido(){
    return this.categoriaCampoRequerido
  }
  get categoriaCampoRequerido(){
    return this.editarEventoForm.get('categoria').errors ? this.editarEventoForm.get('categoria').errors.required && this.editarEventoForm.get('categoria').touched : null
  }

  get precioNoValido(){
    return this.precioRequerido || this.precioPositivo
  }
  get precioRequerido(){
    return this.editarEventoForm.get('precio').errors ? this.editarEventoForm.get('precio').errors.required && this.editarEventoForm.get('precio').touched : null
  }
  get precioPositivo(){
    return this.editarEventoForm.get('precio').errors ? this.editarEventoForm.get('precio').errors.valorPositivo && this.editarEventoForm.get('precio').touched : null
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
