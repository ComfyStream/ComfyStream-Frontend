import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Asistencia } from 'src/app/models/asistencia';
import { Evento } from 'src/app/models/evento';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public eventos: Evento[] = [];
  public misEventos: Evento[] = [];
  public misAsistencias: Evento[] = [];

  constructor(private eventoService : EventoService,
    private asistenciaService:AsistenciaService,
    private router: Router) {}

  async ngOnInit() {
    if(localStorage.getItem("profesional") == "true"){
      this.misEventos = await (this.eventoService.getMisEventos());
    }
    if(localStorage.getItem("token")){
      this.misAsistencias = await (this.asistenciaService.getMisAsistencias());
    }
    this.eventos = await (this.eventoService.getEventosDisponibles());
  }

  mostrarEvento(id: string){
    this.router.navigate(['/evento', id]);
  }

}
