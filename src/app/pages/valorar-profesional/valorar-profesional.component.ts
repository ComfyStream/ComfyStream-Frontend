import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../services/usuario.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Usuario } from "src/app/models/usuario";
import { Valoracion } from "src/app/models/valoracion";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValoracionService } from "src/app/services/valoracion.service";

@Component({
  selector: 'app-valorar-profesional',
  templateUrl: './valorar-profesional.component.html',
  styleUrls: ['./valorar-profesional.component.css']
})
export class ValorarProfesionalComponent implements OnInit {

  public valorarForm:FormGroup
  public profesionalId: string;
  public profesional: Usuario;
  public puedoValorar = false;
  public mediaEstrellas :number;
  public numeroValoraciones :number;
  public valoraciones:Valoracion[] = [];
  public currentRate: number = 3;

  constructor(private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private valoracionService:ValoracionService,
    private fb:FormBuilder,
    private router: Router) { 

      this.valorarForm = this.fb.group({
        mensaje:['', [Validators.required]]
      })
    }

  async ngOnInit() {
    this.activatedRoute.params.subscribe( (params) => {
      this.profesionalId = params['id']; 
    });
    this.puedoValorar = await this.valoracionService.puedoValorar(this.profesionalId);
    this.profesional = await this.usuarioService.getUsuarioPorId(this.profesionalId);
    this.mediaEstrellas = this.profesional.valoracionMedia;
    this.numeroValoraciones = this.profesional.numeroValoraciones;
    if(typeof this.numeroValoraciones === 'undefined'){
      this.numeroValoraciones = 0;
    }else{
      this.numeroValoraciones = this.profesional.numeroValoraciones;
    }
    
   
  }

  mostrarEvento(id: string){
    this.router.navigate(['/evento', id]);
  } 

  submit(){
    if(this.valorarForm.invalid){
      this.valorarForm.markAllAsTouched()
      return;
    }
    let data = {
      "mensaje" : this.valorarForm.value.mensaje,
      "id" : this.profesionalId,
      "estrellas" : this.currentRate
  }
    this.valoracionService.valorar(data);
    
  }
get mensajeRequerido(){
    return this.valorarForm.get('mensaje').errors ? this.valorarForm.get('mensaje').errors.required && this.valorarForm.get('mensaje').touched : null
  }
}
