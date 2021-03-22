import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public usuario = false;

  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    if(localStorage.getItem("token")){
      this.usuario = true;
    }
  }

  logout(){
    this.usuarioService.logout();
  }
}
