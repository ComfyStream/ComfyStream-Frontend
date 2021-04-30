import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Chat } from "../../models/chat";
import { Usuario } from "../../models/usuario";
import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: 'app-chat-tarjeta',
  templateUrl: './chat-tarjeta.component.html',
  styleUrls: ['./chat-tarjeta.component.css']
})
export class ChatTarjetaComponent implements OnInit {

  @Input() chat: Chat;
  @Output() chatSeleccionado: EventEmitter<string>;
  public miUsuario: Usuario;
  public usuario1: Usuario;
  public usuario2: Usuario;
  public soyUsuario1: boolean = false;


  constructor(private usuarioService: UsuarioService) {
    this.chatSeleccionado = new EventEmitter();
   }

  async ngOnInit() {
    this.miUsuario = await this.usuarioService.getUsuario();
    this.usuario1 = await this.usuarioService.getUsuarioPorId(this.chat.usuario1);
    this.usuario2 = await this.usuarioService.getUsuarioPorId(this.chat.usuario2);
    if(this.usuario1._id === this.miUsuario._id){
      this.soyUsuario1 = true;
    }
  }

  mostrarChat(){
    this.chatSeleccionado.emit(this.chat._id);
  }

}
