import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Evento } from 'src/app/models/evento';


@Component({
  selector: 'app-evento-tarjeta',
  templateUrl: './evento-tarjeta.component.html',
  styleUrls: ['./evento-tarjeta.component.css']
})
export class EventoTarjetaComponent {

  @Input() evento: Evento;
  @Output() eventoSeleccionado: EventEmitter<string>;

  constructor(){
    this.eventoSeleccionado = new EventEmitter();
  }

  async ngOnInit() {
  }

  mostrarEvento(){
    this.eventoSeleccionado.emit(this.evento._id);
  }

}