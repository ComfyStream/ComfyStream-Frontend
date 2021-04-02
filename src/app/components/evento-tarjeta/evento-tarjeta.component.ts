import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import Swal from 'sweetalert2';
import { Asistencia } from '../../models/asistencia';
import { AsistenciaService } from '../../services/asistencia.service';
import { EventoService } from '../../services/evento.service';


@Component({
  selector: 'app-evento-tarjeta',
  templateUrl: './evento-tarjeta.component.html',
  styleUrls: ['./evento-tarjeta.component.css']
})
export class EventoTarjetaComponent implements OnInit{

  @Input() evento: Evento;
  @Output() eventoSeleccionado: EventEmitter<string>;
  public href: string = "";
  public asistido: boolean = false;
  public esMio: boolean = false;
  public misAsistencias: Evento[];
  public misEventos: Evento[];
  public urlProfesional: string;
  public urlUsuario: string;
  public activo= false;
  // public asistenciaChecked= false;
  // public miEventoChecked= false;
  // public cargando = true;


  constructor(private router: Router,
    private asistenciaService : AsistenciaService, 
    private eventoService: EventoService){
    this.eventoSeleccionado = new EventEmitter();
  }

  async ngOnInit() {
    this.href = this.router.url;
    this.misAsistencias = await this.asistenciaService.getMisAsistencias();
    this.misEventos = await this.eventoService.getMisEventos();
    
    if(this.misAsistencias != null){
      this.esAsistencia();
    }
    if(this.misEventos != null){
      this.esMiEvento();
    }
    this.datosEvento()

    // if(this.asistenciaChecked && this.miEventoChecked){
    //   this.cargando = false;
    // }
  }

  esAsistencia(){
    for(let evento of this.misAsistencias){
      if(evento._id === this.evento._id){//yo asisto a este evento
        this.asistido = true;
        break;
      }
    }
    // this.asistenciaChecked = true;
  }

  esMiEvento(){
    for(let evento of this.misEventos){
      if(evento._id === this.evento._id){//es mi evento
        this.esMio = true; 
        break;
      }
    }
    // this.miEventoChecked = true; 
  }

  mostrarEvento(){
    this.eventoSeleccionado.emit(this.evento._id);
  }

  asistir(){
    if(!localStorage.getItem("x-token")){
      this.router.navigateByUrl("/login")
    }else{    
      const data = {
      eventoId: this.evento._id
    }
    const evento = this.asistenciaService.crearAsistencia(data);
  }


  }
   async datosEvento(){
    const eventoId={
      eventoId :this.evento._id
    }
    
    const datosReunion = await this.asistenciaService.getDatosReunion(eventoId);
    if(datosReunion!=null){
      const usuarioId = localStorage.getItem("usuarioId");
      if( usuarioId == datosReunion.userId ){
        this.urlProfesional = datosReunion.start_url;
      } 
      else if(this.asistido== true)
      this.urlUsuario = datosReunion.join_url;

      const horaComienzo = new Date (datosReunion.start_time)
      if((horaComienzo.getHours() == new Date().getHours() -1) ||horaComienzo.getHours() == new Date().getHours() ||horaComienzo.getHours() == new Date().getHours() +1) {
          this.activo= true;
      }
      console.log(horaComienzo);
    }
     
    
    
  }

  comenzarEvento(){
    window.open(this.urlProfesional);
  }
  entrarEvento(){
    window.open(this.urlUsuario);
  }


}