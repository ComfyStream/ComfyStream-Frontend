import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-asistencias-admin',
  templateUrl: './asistencias-admin.component.html',
  styleUrls: ['./asistencias-admin.component.css']
})
export class AsistenciasAdminComponent implements OnInit {
  public administrador:boolean = false;
  public asistencias :any[] =[];
  p: number = 1;

  constructor(private usuarioService:UsuarioService,
    private asistenciaService: AsistenciaService) {
  }

   async ngOnInit(){
     this.administrador = (await this.usuarioService.getUsuario()).admin;
    if(this.administrador){
      this.asistencias = await this.asistenciaService.getTodasAsistencias();
    }
    
  }

}

