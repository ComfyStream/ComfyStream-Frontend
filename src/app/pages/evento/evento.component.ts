import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AsistenciaService } from '../../services/asistencia.service';
import Swal from 'sweetalert2';
import { ChatService } from '../../services/chat.service';
import { Usuario } from '../../models/usuario';
import { Chat } from 'src/app/models/chat';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  public evento: Evento;
  public eventoId: string;
  public usuario: Usuario;
  public asistido = false;
  public esMio = false;
  public misEventos: Evento[];
  public misAsistencias: Evento[];
  public misChats: Chat[] = [];
  public cargando = true;
  public asistenciaChecked= false;
  public eventoPasado: boolean = false;
  public yaTengoUnChatConElCreador:Boolean = false;
  public usuarioCreadorEvento: Usuario;
  public miEventoChecked= false;
  public urlProfesional: string;
  public urlUsuario: string;
  public activo= false;
  public asistentes: Usuario[] =[];

  constructor(private eventoService: EventoService,
    private asistenciaService: AsistenciaService,
    private activatedRoute: ActivatedRoute,
    private chatService : ChatService,
    private usuarioService: UsuarioService,
    private router:Router) {
    }

  async ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.eventoId = params['id']; 
    });
    this.evento = await this.eventoService.getEventoPorID(this.eventoId);
    this.datosEvento();
    this.eventoAntiguo();

    this.usuario = await this.usuarioService.getUsuarioPorId(this.evento.profesional);
    
    if(localStorage.getItem("token")){
      this.yaTengoUnChatConElCreador = await this.chatService.existeChat(this.evento.profesional);
      this.misAsistencias = await this.asistenciaService.getMisAsistencias();
      this.misEventos = await this.eventoService.getMisEventos();
      if(this.misAsistencias != null){
        this.esAsistencia();
      }
      if(this.misEventos != null){
        this.miEvento();
      }
      if(this.esMio){
        this.asistentes = await this.eventoService.asistentesAlEvento(this.eventoId);
      }
    }
    
    if(this.asistenciaChecked && this.miEventoChecked){
      this.cargando = false;
    }
    if(!localStorage.getItem("token")){
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
    if(!localStorage.getItem("token")){
      this.router.navigateByUrl("/login")
    }else{    
    const data = {
      eventoId: this.evento._id
    }
    this.router.navigateByUrl("/asistir/"+this.evento._id)
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
      const horaComienzo = new Date (datosReunion.start_time);
      const hoy = new Date();
      if(Math.floor(Math.abs(horaComienzo.getTime() - hoy.getTime())/36e5)<=1){
          this.activo= true;
      }
    } 
  }

  comenzarEvento(){
    window.open(this.urlProfesional);
  }
  entrarEvento(){
    window.open(this.urlUsuario);
  }

  async iniciarChat(){
    if(!localStorage.getItem("token")){
      this.router.navigateByUrl("/login")
    }else{    
      var creadorEventoId: string = this.evento.profesional;
      const chat = await this.chatService.iniciarChat(creadorEventoId);
      this.router.navigateByUrl("/chat/"+chat._id)
    }
  }

  async getChatExistente(){
    if(!localStorage.getItem("token")){
      this.router.navigateByUrl("/login")
    }else{    
      var miUsuario: Usuario = await this.usuarioService.getUsuario();
      var creadorEventoId: string = this.evento.profesional;
      this.usuarioCreadorEvento = await this.usuarioService.getUsuarioPorId(creadorEventoId);
      this.misChats = await this.chatService.getMisChats();
      for(let chat of this.misChats){
        if((chat.usuario1 === miUsuario._id && chat.usuario2 === this.usuarioCreadorEvento._id) ||
         (chat.usuario1 === this.usuarioCreadorEvento._id && chat.usuario2 === miUsuario._id)){
            this.router.navigateByUrl("/chat/"+chat._id)
         }
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

  borrar(){
    if(confirm("¿Estás seguro de que quieres borrar este evento?"))
    this.eventoService.borrarEvento(this.eventoId);
  }

}
