import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Chat } from '../../models/chat';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public usuario = false;
  public profesional: boolean = false;


  constructor(private usuarioService:UsuarioService,
    private chatService: ChatService) { }

  async ngOnInit(){
    if(localStorage.getItem("token")){
      this.usuario = true;

      if(localStorage.getItem('profesional')=== "true"){
        this.profesional = true;
      }
    }
  }

  logout(){
    this.usuarioService.logout();
  }


}
