import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  public zoom:string;
  public usuarioZoom:any;
  public token = localStorage.getItem("token")

  constructor(private usuarioService:UsuarioService) { }

  async ngOnInit() {
    this.usuarioZoom = await this.usuarioService.getUsuarioZoom();
  }

  async enlazarCuenta(){
    this.zoom = await this.usuarioService.enlazarZoom()
    window.open(this.zoom, '_blank');


  }

  async borrarCuenta(){
    const resp = await this.usuarioService.borrarUsuarioZoom()


  }


}
