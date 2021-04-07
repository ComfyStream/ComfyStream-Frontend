import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { EventoService } from '../../services/evento.service';
import { Router } from '@angular/router';
import { AsistenciaService } from 'src/app/services/asistencia.service';

@Component({
  selector: 'app-mis-eventos',
  templateUrl: './mis-eventos.component.html',
  styleUrls: ['./mis-eventos.component.css']
})
export class MisEventosComponent implements OnInit {
  public eventos: Evento[] = [];
  public misEventos: Evento[] = [];
  public misAsistencias: Evento[] = [];

  constructor(private eventoService : EventoService,
    private asistenciaService :AsistenciaService,
    private router: Router) { }

  async ngOnInit() {
    if(localStorage.getItem("profesional") == "true"){
      this.misEventos = await (this.eventoService.getMisEventos());
    }
    this.misAsistencias = await (this.asistenciaService.getMisAsistencias());
    this.eventos = this.misEventos;
  
  }

  mostrarEvento(id: string){
    this.router.navigate(['/evento', id]);
  }

}
