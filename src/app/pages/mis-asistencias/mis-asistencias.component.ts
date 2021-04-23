import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { Router } from '@angular/router';
import { AsistenciaService } from '../../services/asistencia.service';
import { EventoService } from 'src/app/services/evento.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-mis-asistencias',
  templateUrl: './mis-asistencias.component.html',
  styleUrls: ['./mis-asistencias.component.css']
})
export class MisAsistenciasComponent implements OnInit {

  public eventos: Evento[] = [];
  public misEventos: Evento[] = [];
  public misAsistencias: Evento[] = [];
  public cargado=false;
  public soloEventosFuturos:Evento[] = [];
  public mostrarActivos = false;
  public filtro = this.fb.group({
    filtro:['todos']

  });

  constructor(private asistenciaService : AsistenciaService,
    private eventoService: EventoService,
    private fb: FormBuilder,
    private router: Router) { }

  async ngOnInit() {
    if(localStorage.getItem("profesional") == "true"){
      this.misEventos = await (this.eventoService.getMisEventos());
    }
    this.misAsistencias = await (this.asistenciaService.getMisAsistencias());
    this.eventos = this.misAsistencias;
    this.cargado=true;

    for(let evento of this.misAsistencias){
      if(new Date(evento.fecha) > new Date()){
        this.soloEventosFuturos.push(evento);

      }
    }
  }
  

  mostrarEvento(id: string){
    this.router.navigate(['/evento', id]);
  }


  verActivos(){
    if(this.filtro.controls['filtro'].value=="todos")
      this.mostrarActivos=false;
    else if(this.filtro.controls['filtro'].value=="activos")
      this.mostrarActivos = true;
  }
}
