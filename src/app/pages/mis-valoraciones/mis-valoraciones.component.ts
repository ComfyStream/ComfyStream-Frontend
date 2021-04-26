import { Component, OnInit } from '@angular/core';
import { Valoracion } from 'src/app/models/valoracion';
import { ValoracionService } from 'src/app/services/valoracion.service';

@Component({
  selector: 'app-mis-valoraciones',
  templateUrl: './mis-valoraciones.component.html',
  styleUrls: ['./mis-valoraciones.component.css']
})
export class MisValoracionesComponent implements OnInit {
  public misValoraciones: Valoracion[] = []

  constructor(private valoracionService:ValoracionService) { }

  async ngOnInit() {
    this.misValoraciones = await this.valoracionService.getMisValoraciones();
    console.log(this.misValoraciones);


  }

  borrarValoracion(valoracionId:string){
    this.valoracionService.borrarValoracion(valoracionId);

  }

}
