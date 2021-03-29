import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public usuario = false;
  public profesional: boolean = false;


  constructor(private usuarioService:UsuarioService) { }

  async ngOnInit(){
    if(localStorage.getItem("token")){
      this.usuario = true;
      /* this.profesional = Boolean(localStorage.getItem('profesional')); */

      if(localStorage.getItem('profesional')){
        this.profesional = true;
      }
    }
  }

  logout(){
    this.usuarioService.logout();
  }


}
