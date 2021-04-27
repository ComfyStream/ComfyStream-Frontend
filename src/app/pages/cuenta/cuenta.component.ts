import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuario';
@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  public zoom:string;
  public usuarioZoom:any;
  public usuario: Usuario;
  public token = localStorage.getItem("token")

  constructor(private usuarioService:UsuarioService,
    private router:Router) { }

  async ngOnInit() {
    this.usuarioZoom = await this.usuarioService.getUsuarioZoom();
    this.usuario = await this.usuarioService.getUsuario();
    console.log(this.usuario)
  }

  async enlazarCuenta(){
    this.zoom = await this.usuarioService.enlazarZoom()
    window.open(this.zoom, '_blank');


  }
  cambiarContrasena(){
    this.router.navigateByUrl("/contrasena")
  }
  cambiarDatosBancarios(){
    this.router.navigateByUrl("/datos-bancarios")
  }

  async borrarCuenta(){
    const resp = await this.usuarioService.borrarUsuarioZoom()


  }


}

