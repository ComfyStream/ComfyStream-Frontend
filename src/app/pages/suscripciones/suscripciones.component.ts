import { Component, OnInit } from '@angular/core';
import { SuscripcionService } from '../../services/suscripcion.service';
import { UsuarioSuscripcion } from '../../models/usuario-suscripcion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-suscripciones',
  templateUrl: './suscripciones.component.html',
  styleUrls: ['./suscripciones.component.css']
})
export class SuscripcionesComponent implements OnInit {

  suscripciones:UsuarioSuscripcion[]

  constructor(private suscripcionService:SuscripcionService) { }

  async ngOnInit() {
    Swal.showLoading();
    this.suscripciones = await this.suscripcionService.suscripciones();
    Swal.close()
  }

}
