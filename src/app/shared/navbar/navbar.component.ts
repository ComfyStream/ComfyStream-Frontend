import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsuarioService } from "src/app/services/usuario.service";
import { ChatService } from "../../services/chat.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public usuario = false;
  public profesional: boolean = false;
  public admin: boolean = false;


  constructor(private usuarioService:UsuarioService,
    private chatService: ChatService,
    private router:Router) { }

  async ngOnInit(){
    if(localStorage.getItem("token")){
      this.usuario = true;

      if(localStorage.getItem('profesional')=== "true"){
        this.profesional = true;
      }
      if((await this.usuarioService.getUsuario()).admin){
        this.admin = true;
      }
    }
  }

  logout(){
    this.usuarioService.logout();
  }
  registro(){
    localStorage.removeItem('token');
    localStorage.removeItem('profesional');

    this.router.navigateByUrl('/registro');
  }


}
