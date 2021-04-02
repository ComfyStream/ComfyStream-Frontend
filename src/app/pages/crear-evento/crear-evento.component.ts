import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventoService } from 'src/app/services/evento.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';

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

  constructor(private fb:FormBuilder,
    private usuarioService:UsuarioService,
    private eventoService:EventoService) { }

  async ngOnInit() {

    this.crearEventoForm = this.fb.group({
      titulo:['', Validators.required],
      descripcion:['', Validators.required],
      categoria:['', [ Validators.required] ],
      subcategoria:['' ],
      esPersonal:[true, Validators.required],
      fecha:['', Validators.required],
      precio:['', Validators.required],
      duracion:['', Validators.required],
      img:[,Validators.required]
    });

    this.usuario = await this.usuarioService.getUsuario()

  }

  cambiarImagen( event ) {
    const file = event.target.files[0];
    console.log(file);
    this.imagenSubir = file;
    
    }
  
  async crearEvento(){
    if(this.crearEventoForm.invalid){
      return;
    }
    console.log(this.crearEventoForm.value)
    const datos = this.crearEventoForm.value;
    delete datos.img;
    const evento =  await this.eventoService.crearEvento(datos, this.imagenSubir);
    const room =  await this.eventoService.crearSalaZoom(evento["evento"]);
    console.log(room);

    
    // console.log(this.imagenesSubir);
    // for(let imagen of this.imagenesSubir)
    // this.subirImagenService.postearImagen(imagen, 'productos', productoId)
    // .then( () => {
    //   Swal.fire('Guardado', 'Imagen de usuario subida', 'success');
    // }).catch( err => {
    //   console.log(err);
    //   Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    // });
  }
  
}
