import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { EventoService } from '../../services/evento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-eventos',
  templateUrl: './mis-eventos.component.html',
  styleUrls: ['./mis-eventos.component.css']
})
export class MisEventosComponent implements OnInit {

  public eventos: Evento[] = [];

  constructor(private eventoService : EventoService,
    private router: Router) { }

  async ngOnInit() {
    this.eventos = await (this.eventoService.getMisEventos());
  }

  mostrarEvento(id: string){
    this.router.navigate(['/evento', id]);
  }

}
