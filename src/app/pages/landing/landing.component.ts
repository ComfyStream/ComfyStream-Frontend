import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  public code:string;
  

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute) { }

  async ngOnInit(){
     this.code = this.route.snapshot.queryParamMap.get('code');
     console.log(this.code);
     var datos = 
     {
         "code": this.code,
     };
  
     const data = await this.usuarioService.almacenarUsuarioZoom(datos);
  }

}
