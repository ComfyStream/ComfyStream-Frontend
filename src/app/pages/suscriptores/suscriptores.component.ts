import { Component, OnInit } from '@angular/core';
import { UsuarioSuscripcion } from '../../models/usuario-suscripcion';
import { SuscripcionService } from '../../services/suscripcion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-suscriptores',
  templateUrl: './suscriptores.component.html',
  styleUrls: ['./suscriptores.component.css']
})
export class SuscriptoresComponent implements OnInit {

  suscriptores:UsuarioSuscripcion[]

  constructor(private suscripcionService:SuscripcionService) { }

  async ngOnInit() {
    Swal.showLoading();
    this.suscriptores = await this.suscripcionService.suscriptores();
    Swal.close();
  }
}
