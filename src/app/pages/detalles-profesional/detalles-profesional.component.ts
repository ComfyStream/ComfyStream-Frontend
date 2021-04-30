import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../services/usuario.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Usuario } from "src/app/models/usuario";
import { Evento } from "src/app/models/evento";
import { EventoService } from "../../services/evento.service";
import { AsistenciaService } from "../../services/asistencia.service";
import { Valoracion } from "src/app/models/valoracion";
import { ValoracionService } from "src/app/services/valoracion.service";

@Component({
  selector: 'app-detalles-profesional',
  templateUrl: './detalles-profesional.component.html',
  styleUrls: ['./detalles-profesional.component.css']
})
export class DetallesProfesionalComponent implements OnInit {

  public usuarioId: string;
  public profesional: Usuario;
  public eventosDisponibles: Evento[] = [];
  public eventosDelProfesional: Evento[] = [];
  public misEventos: Evento[] = [];
  public misAsistencias: Evento[] = [];
  public mediaEstrellas :number = 3.5
  public valoraciones:Valoracion[] = [];
  public numeroValoraciones:number;
  public puedoValorar = false;

  constructor(private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private eventoService : EventoService,
    private asistenciaService:AsistenciaService,
    private valoracionService:ValoracionService,
    private router: Router) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe( (params) => {
      this.usuarioId = params['id']; 
    });
    
    if(localStorage.getItem("profesional") == "true"){
      this.misEventos = await (this.eventoService.getMisEventos());
    }
    if(localStorage.getItem("token")){
      this.misAsistencias = await (this.asistenciaService.getMisAsistencias());
    }
    this.profesional = await this.usuarioService.getUsuarioPorId(this.usuarioId);
    this.puedoValorar = await this.valoracionService.puedoValorar(this.profesional._id);

    this.numeroValoraciones = this.profesional.numeroValoraciones;
    this.mediaEstrellas = this.profesional.valoracionMedia;
    if(typeof this.numeroValoraciones === 'undefined'){
      this.numeroValoraciones = 0;
    }else{
      this.numeroValoraciones = this.profesional.numeroValoraciones;
    }
    
    this.eventosDisponibles = await this.eventoService.getEventosDisponibles();
    this.valoraciones = await this.valoracionService.getValoracionesPorId(this.usuarioId);
    for(let evento of this.eventosDisponibles){
      if(evento.profesional === this.usuarioId){
        this.eventosDelProfesional.push(evento);
      }
    }

  }

  mostrarEvento(id: string){
    this.router.navigate(['/evento', id]);
  }
  valorar(){
    this.router.navigateByUrl("/valorar/"+this.profesional._id);

  }
}
