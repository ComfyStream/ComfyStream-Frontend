import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import Swal from 'sweetalert2';
import { Asistencia } from '../../models/asistencia';
import { AsistenciaService } from '../../services/asistencia.service';
import { EventoService } from '../../services/evento.service';


@Component({
  selector: 'app-evento-tarjeta',
  templateUrl: './evento-tarjeta.component.html',
  styleUrls: ['./evento-tarjeta.component.css']
})
export class EventoTarjetaComponent implements OnInit{

  @Input() evento: Evento;
  @Output() eventoSeleccionado: EventEmitter<string>;
  public href: string = "";
  public asistido: boolean = false;
  public esMio: boolean = false;
  public misAsistencias: Evento[];
  public misEventos: Evento[];
  // public asistenciaChecked= false;
  // public miEventoChecked= false;
  // public cargando = true;


  constructor(private router: Router,
    private asistenciaService : AsistenciaService, 
    private eventoService: EventoService){
    this.eventoSeleccionado = new EventEmitter();
  }

  async ngOnInit() {
    this.href = this.router.url;
    this.misAsistencias = await this.asistenciaService.getMisAsistencias();
    this.misEventos = await this.eventoService.getMisEventos();
    if(this.misAsistencias != null){
      this.esAsistencia();
    }
    if(this.misEventos != null){
      this.esMiEvento();
    }
    // if(this.asistenciaChecked && this.miEventoChecked){
    //   this.cargando = false;
    // }
  }

  esAsistencia(){
    for(let evento of this.misAsistencias){
      if(evento._id === this.evento._id){//yo asisto a este evento
        this.asistido = true;
        break;
      }
    }
    // this.asistenciaChecked = true;
  }

  esMiEvento(){
    for(let evento of this.misEventos){
      if(evento._id === this.evento._id){//es mi evento
        this.esMio = true; 
        break;
      }
    }
    // this.miEventoChecked = true; 
  }

  mostrarEvento(){
    this.eventoSeleccionado.emit(this.evento._id);
  }

  asistir(){
    const data = {
      eventoId: this.evento._id
    }
    const evento = this.asistenciaService.crearAsistencia(data);

  }

}