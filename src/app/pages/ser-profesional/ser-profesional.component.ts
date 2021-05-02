import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Usuario } from "../../models/usuario";
import { UsuarioService } from "../../services/usuario.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-ser-profesional',
  templateUrl: './ser-profesional.component.html',
  styleUrls: ['./ser-profesional.component.css']
})
export class SerProfesionalComponent implements OnInit {
  public usuario: Usuario ;
  public perfilProfesionalForm: FormGroup;
  public usuarioId: string;
  public profesional:boolean = false;

  constructor(private fb:FormBuilder, private usuarioService : UsuarioService, private activatedRoute: ActivatedRoute) { }

  async ngOnInit(){
    
    if(localStorage.getItem("token")){
      this.activatedRoute.params.subscribe( (params) => {
        this.usuarioId = params['id']; 
      });
      this.usuario = await (this.usuarioService.getUsuarioPorId(localStorage.getItem("usuarioId")));

      if(!this.usuario.profesional){
        this.perfilProfesionalForm = this.fb.group({
         sector: [ "", Validators.required ],
         descripcion: [ "", Validators.required],
         cuentaBancariaIBAN: [ "", [ Validators.required,Validators.maxLength(24),Validators.minLength(24)]],
         titularCuenta: [ "", Validators.required ],
         profesional: [ this.profesional , Validators.required ],
       });
      }

    }
  }

  async editarPerfilProfesional(){
    if(this.perfilProfesionalForm.invalid){
      this.perfilProfesionalForm.markAllAsTouched()
      return;
    }
    if(this.profesional){
    const datos = this.perfilProfesionalForm.value;
    this.usuario = await this.usuarioService.editarPerfil(datos);

    }
  }

  //Validaciones
  get sectorNoValido(){
    return this.sectorCampoRequerido
  }
  get sectorCampoRequerido(){
    return this.perfilProfesionalForm.get('sector').errors ? this.perfilProfesionalForm.get('sector').errors.required && this.perfilProfesionalForm.get('sector').touched : null
  }
  get descripcionNoValido(){
    return this.descripcionCampoRequerido
  }
  get descripcionCampoRequerido(){
    return this.perfilProfesionalForm.get('descripcion').errors ? this.perfilProfesionalForm.get('descripcion').errors.required && this.perfilProfesionalForm.get('descripcion').touched : null
  }
  get ibanNoValido(){
    return this.ibanCampoRequerido || this.validarCuentaM || this.validarCuentaMin
  }
  get ibanCampoRequerido(){
    return this.perfilProfesionalForm.get('cuentaBancariaIBAN').errors ? this.perfilProfesionalForm.get('cuentaBancariaIBAN').errors.required && this.perfilProfesionalForm.get('cuentaBancariaIBAN').touched : null
  }
  get titularNoValido(){
    return this.titularCampoRequerido
  }
  get titularCampoRequerido(){
    return this.perfilProfesionalForm.get('titularCuenta').errors ? this.perfilProfesionalForm.get('titularCuenta').errors.required && this.perfilProfesionalForm.get('titularCuenta').touched : null
  }
  get validarCuentaM(){
    return this.perfilProfesionalForm.get('cuentaBancariaIBAN').errors ? this.perfilProfesionalForm.get('cuentaBancariaIBAN').errors.maxlength && this.perfilProfesionalForm.get('cuentaBancariaIBAN').touched : null
  }
  get validarCuentaMin(){
    return this.perfilProfesionalForm.get('cuentaBancariaIBAN').errors ? this.perfilProfesionalForm.get('cuentaBancariaIBAN').errors.minlength && this.perfilProfesionalForm.get('cuentaBancariaIBAN').touched : null
  }

}

