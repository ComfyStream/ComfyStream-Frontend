import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AsistenciaService } from '../../services/asistencia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  public evento: Evento;
  public eventoId: string;
  public usuario: string;
  public asistido = false;
  public esMio = false;
  public misEventos: Evento[];
  public misAsistencias: Evento[];
  public cargando = true;
  public asistenciaChecked= false;
  public miEventoChecked= false;
  public urlProfesional: string;
  public urlUsuario: string;
  public activo= false;

  constructor(private eventoService: EventoService,
    private asistenciaService: AsistenciaService,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router:Router) {
    }

  async ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.eventoId = params['id']; 
    });
    this.datosEvento()
    this.evento = await this.eventoService.getEventoPorID(this.eventoId);
    this.usuario = await this.usuarioService.getUsuarioPorId(this.evento.profesional);
    this.misAsistencias = await this.asistenciaService.getMisAsistencias();
    this.misEventos = await this.eventoService.getMisEventos();
    if(this.misAsistencias != null){
      this.esAsistencia();
    }
    if(this.misEventos != null){
      this.miEvento();
    }
    if(this.asistenciaChecked && this.miEventoChecked){
      this.cargando = false;
    }
  }
  
  miEvento(){
      for(let evento of this.misEventos){
        if(evento._id === this.evento._id){
          this.esMio = true;
          break;
        }
      }
      this.miEventoChecked = true; 
      
  }

  esAsistencia(){
    for(let evento of this.misAsistencias){
      if(evento._id === this.evento._id){//yo asisto a este evento
        this.asistido = true;
        break;
      }
    }
    this.asistenciaChecked = true;
  }

  asistir(){
    if(!localStorage.getItem("x-token")){
      this.router.navigateByUrl("/login")
    }else{    
    const data = {
      eventoId: this.evento._id
    }
    const evento = this.asistenciaService.crearAsistencia(data);

  }}


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
