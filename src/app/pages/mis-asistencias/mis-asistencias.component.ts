import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { Router } from '@angular/router';
import { AsistenciaService } from '../../services/asistencia.service';

@Component({
  selector: 'app-mis-asistencias',
  templateUrl: './mis-asistencias.component.html',
  styleUrls: ['./mis-asistencias.component.css']
})
export class MisAsistenciasComponent implements OnInit {

  public eventos: Evento[] = [];

  constructor(private asistenciaService : AsistenciaService,
    private router: Router) { }

  async ngOnInit() {
    this.eventos = await (this.asistenciaService.getMisAsistencias());
  }

  mostrarEvento(id: string){
    this.router.navigate(['/evento', id]);
  }

}
