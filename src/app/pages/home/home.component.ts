import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public eventos: Evento[] = [];

  constructor(private eventoService : EventoService,
    private router: Router) { }

  async ngOnInit() {
    this.eventos = await (this.eventoService.getEventos());
  }

  mostrarEvento(id: string){
    this.router.navigate(['/evento', id]);
  }

}
