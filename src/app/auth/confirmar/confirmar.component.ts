import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../services/usuario.service";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent implements OnInit {

  constructor(private usuarioService:UsuarioService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    Swal.showLoading();
    this.activatedRoute.params.subscribe(async params => {
      const urlConfirmacion = params["urlConfirmacion"];
      const msg = await this.usuarioService.confirmarCuenta(urlConfirmacion);
      if(msg == "Usuario confirmado"){
        Swal.fire('Cuenta confirmada', '', 'success');
      }else{
        Swal.fire('Se ha producido un error al confirmar el email', 'Pruebe en otro momento', 'error');
      }
      this.router.navigateByUrl("/login");
    })
  }

}