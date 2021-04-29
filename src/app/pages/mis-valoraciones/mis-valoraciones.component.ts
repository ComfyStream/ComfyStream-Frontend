import { Component, OnInit } from '@angular/core';
import { Valoracion } from 'src/app/models/valoracion';
import { ValoracionService } from 'src/app/services/valoracion.service';
import Swal from 'sweetalert2';

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



  }

  borrarValoracion(valoracionId:string){
    Swal.fire({
      icon: 'question' ,
      title: "¿Estás seguro de que quieres borrar la valoración?",
      showCancelButton: true,
      confirmButtonText : "Borrar",
      cancelButtonText : "Cancelar"
    }).then((result)=> {
      if(result.value){
        this.valoracionService.borrarValoracion(valoracionId);
      }
    })
   

  }

}
