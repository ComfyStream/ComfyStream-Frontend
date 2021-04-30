import { Component, OnInit } from "@angular/core";
import { Evento } from "src/app/models/evento";
import { EventoService } from "../../services/evento.service";
import { Router } from "@angular/router";
import { AsistenciaService } from "src/app/services/asistencia.service";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-mis-eventos',
  templateUrl: './mis-eventos.component.html',
  styleUrls: ['./mis-eventos.component.css']
})
export class MisEventosComponent implements OnInit {
  public eventos: Evento[] = [];
  public misEventos: Evento[] = [];
  //public misAsistencias: Evento[] = [];
  public soloEventosFuturos:Evento[] = [];
  public mostrarActivos = false;
  public filtro = this.fb.group({
    filtro:['todos']

  });

  constructor(private eventoService : EventoService,
    private asistenciaService :AsistenciaService,
    private fb: FormBuilder,
    private router: Router) { }

  async ngOnInit() {
    if(localStorage.getItem("profesional") == "true"){
      this.misEventos = await (this.eventoService.getMisEventos());
    }
    //this.misAsistencias = await (this.asistenciaService.getMisAsistencias());
    this.eventos = this.misEventos;
    for(let evento of this.misEventos){
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
