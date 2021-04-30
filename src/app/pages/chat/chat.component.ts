import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mensaje } from 'src/app/models/mensaje';
import { ChatService } from '../../services/chat.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { Chat } from 'src/app/models/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public chatId: string;
  public esteChat: Chat = null;
  public usuario1: Usuario;
  public usuario2: Usuario;
  public misChats: Chat[] = [];
  public mensajes: Mensaje[];
  public crearMensajeForm: FormGroup;
  public miUsuario: Usuario;
  public soyUsuario1: boolean = false;

  constructor(private fb:FormBuilder,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private chatService: ChatService) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe( (params) => {
      this.chatId = params['id']; 
    });
    
    this.miUsuario = await this.usuarioService.getUsuario();
    this.mensajes = await this.chatService.getMensajesDelChat(this.chatId);
    this.misChats = await this.chatService.getMisChats();
    
    this.crearMensajeForm = this.fb.group({
      cuerpo:['', [Validators.required]],
    });

    this.cargarUsuarios()
    .then(() => {
      for(let i = 0; i< this.mensajes.length; i++){
        if(this.mensajes[i].autor === this.usuario1._id){
          document.getElementById('autor'+i).innerHTML = "Autor: "+this.usuario1.nombre;
        }
        if(this.mensajes[i].autor === this.usuario2._id){
          document.getElementById('autor'+i).innerHTML = "Autor: "+this.usuario2.nombre;
        }
      }
    })
    
  }

  async cargarUsuarios(){
    for(let chat of this.misChats){
      if(chat._id === this.chatId){
        this.esteChat = chat;
        this.usuario1 = await this.usuarioService.getUsuarioPorId(this.esteChat.usuario1);
        this.usuario2 = await this.usuarioService.getUsuarioPorId(this.esteChat.usuario2);
        if(this.usuario1._id === this.miUsuario._id){
          this.soyUsuario1 = true;
        }
      }
    }
  }

  async enviarMensaje(){
    if(this.crearMensajeForm.invalid){
      this.crearMensajeForm.markAllAsTouched()
      return;
    }
    const datos: any = {
      chatId: this.chatId,
      cuerpo: this.crearMensajeForm.controls['cuerpo'].value
    }
    await this.chatService.enviarMensaje(datos)
    location.reload();
  }
  
  //Validaciones
  get cuerpoNoValido(){
    return this.cuerpoCampoRequerido
  }
  get cuerpoCampoRequerido(){
    return this.crearMensajeForm.get('cuerpo').errors ? this.crearMensajeForm.get('cuerpo').errors.required && this.crearMensajeForm.get('cuerpo').touched : null
  }

}
