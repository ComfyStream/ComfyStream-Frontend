import { Component } from '@angular/core';
import { Evento } from '../../models/evento';
import { EventoService } from '../../services/evento.service';
import { AsistenciaService } from '../../services/asistencia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent{

  currentRate = 0;

  datos:any = {
    titulo:"",
    categoria:"",
    precioMin:"",
    precioMax:"",
    fechaMin:"",
    fechaMax:"",
    estrellas: ""
  }
  
  precioMinError:boolean = false
  precioMaxError:boolean = false
  
  eventos: Evento[] = [];
  misEventos: Evento[] = [];
  misAsistencias: Evento[] = [];

  constructor(private eventoService : EventoService,
    private asistenciaService:AsistenciaService,
    private router: Router) {}

  async ngOnInit() {

    this.eventos = await this.eventoService.buscar(this.datos)
    
    if(localStorage.getItem("profesional") == "true"){
      this.misEventos = await (this.eventoService.getMisEventos());
    }
    if(localStorage.getItem("token")){
      this.misAsistencias = await (this.asistenciaService.getMisAsistencias());
    }
    
  }

  mostrarEvento(id: string){
    this.router.navigate(['/evento', id]);
  }

  async buscar(){
    this.datos["estrellas"] = this.currentRate;
    this.eventos = await this.eventoService.buscar(this.datos)
  }



}
