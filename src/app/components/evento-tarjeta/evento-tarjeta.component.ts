import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from 'src/app/models/evento';


@Component({
  selector: 'app-evento-tarjeta',
  templateUrl: './evento-tarjeta.component.html',
  styleUrls: ['./evento-tarjeta.component.css']
})
export class EventoTarjetaComponent implements OnInit{

  @Input() evento: Evento;
  @Output() eventoSeleccionado: EventEmitter<string>;
  public href: string = "";

  constructor(private router: Router){
    this.eventoSeleccionado = new EventEmitter();
  }

  async ngOnInit() {
    this.href = this.router.url;
    console.log(this.router.url);
    
  }

  mostrarEvento(){
    this.eventoSeleccionado.emit(this.evento._id);
  }

}