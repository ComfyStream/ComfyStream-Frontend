import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { Router } from '@angular/router';
import { AsistenciaService } from '../../services/asistencia.service';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-mis-asistencias',
  templateUrl: './mis-asistencias.component.html',
  styleUrls: ['./mis-asistencias.component.css']
})
export class MisAsistenciasComponent implements OnInit {

  public eventos: Evento[] = [];
  public misEventos: Evento[] = [];
  public misAsistencias: Evento[] = [];

  constructor(private asistenciaService : AsistenciaService,
    private eventoService: EventoService,
    private router: Router) { }

  async ngOnInit() {
    if(localStorage.getItem("profesional") == "true"){
      this.misEventos = await (this.eventoService.getMisEventos());
    }
    this.misAsistencias = await (this.asistenciaService.getMisAsistencias());
    console.log(this.misAsistencias);
    this.eventos = this.misAsistencias;
  }
  

  mostrarEvento(id: string){
    this.router.navigate(['/evento', id]);
  }

}
