import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { ActivatedRoute } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  public evento: Evento;
  public eventoId: string;
  public usuario: string;

  constructor(private eventoService: EventoService,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService) {
    }

  async ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.eventoId = params['id']; 
    });

    this.evento = await this.eventoService.getEventoPorID(this.eventoId);
    this.usuario = await this.usuarioService.getUsuarioPorId(this.evento.profesional);
    


  }

}
