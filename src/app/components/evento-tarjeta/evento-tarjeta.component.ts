import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import Swal from 'sweetalert2';
import { Asistencia } from '../../models/asistencia';
import { AsistenciaService } from '../../services/asistencia.service';
import { EventoService } from '../../services/evento.service';
import { ChatService } from '../../services/chat.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuario';
import { Chat } from 'src/app/models/chat';


@Component({
  selector: 'app-evento-tarjeta',
  templateUrl: './evento-tarjeta.component.html',
  styleUrls: ['./evento-tarjeta.component.css']
})
export class EventoTarjetaComponent implements OnInit{

  @Input() evento: Evento;
  @Input() misAsistencias: Evento[];
  @Input() misEventos: Evento[];
  @Output() eventoSeleccionado: EventEmitter<string>;
  public misChats: Chat[] = [];
  public href: string = "";
  public usuarioCreadorEvento: Usuario;
  public asistido: boolean = false;
  public esMio: boolean = false;
  public yaTengoUnChatConElCreador:Boolean = false;
  public urlProfesional: string;
  public urlUsuario: string;
  public activo= false;
  // public asistenciaChecked= false;
  // public miEventoChecked= false;
  // public cargando = true;


  constructor(private router: Router,
    private asistenciaService : AsistenciaService,
    private chatService : ChatService,
    private usuarioService: UsuarioService){
    this.eventoSeleccionado = new EventEmitter();
  }

  async ngOnInit() {
    this.href = this.router.url;
    
    if(this.misAsistencias != null){
      this.esAsistencia();
    }
    if(this.misEventos != null){
      this.esMiEvento();
    }
    this.datosEvento()

    this.yaTengoUnChatConElCreador = await this.chatService.existeChat(this.evento.profesional)
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
    if(!localStorage.getItem("token")){
      this.router.navigateByUrl("/login")
    }else{    
      const data = {
      eventoId: this.evento._id
    }
    const evento = this.asistenciaService.crearAsistencia(data);
    this.router.navigateByUrl("/evento/"+this.evento._id)
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

      const hoy = new Date();
      const horaComienzo = new Date (datosReunion.start_time)
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




}