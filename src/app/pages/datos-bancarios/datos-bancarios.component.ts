import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Usuario } from "src/app/models/usuario";
import { UsuarioService } from "src/app/services/usuario.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos-bancarios',
  templateUrl: './datos-bancarios.component.html',
  styleUrls: ['./datos-bancarios.component.css']
})
export class DatosBancariosComponent implements OnInit {
  public usuario: Usuario;
  public datosBancariosForm: FormGroup;
  constructor(private usuarioService : UsuarioService,private fb:FormBuilder, private router:Router) { }

  async ngOnInit(){
    if(localStorage.getItem("token")){
      this.usuario = await (this.usuarioService.getUsuarioPorId(localStorage.getItem("usuarioId")));
      this.datosBancariosForm= this.fb.group({
        titular: [ this.usuario.titularCuenta , Validators.required ],
        cuenta: [ this.usuario.cuentaBancariaIBAN, [ Validators.required,this.cuentaBancariaValida] ],
        contrasena: [ ,Validators.required ],
         });
  }
  }
  async editarDatosBancarios(){
    if(this.datosBancariosForm.invalid){
      this.datosBancariosForm.markAllAsTouched()
      return;
    }
    
    const datos = this.datosBancariosForm.value;
    this.usuario = await this.usuarioService.editarBanco(datos);
    this.router.navigateByUrl("/");
    
  }

  get titularNoValido(){
    return this.titularCampoRequerido
  }
  get titularCampoRequerido(){
    return this.datosBancariosForm.get('titular').errors ? this.datosBancariosForm.get('titular').errors.required && this.datosBancariosForm.get('titular').touched : null
  }
  get contrasenaValido(){
    return this.contrasenaCampoRequerido 
  }
  get contrasenaCampoRequerido(){
    return this.datosBancariosForm.get('contrasena').errors ? this.datosBancariosForm.get('contrasena').errors.required && this.datosBancariosForm.get('contrasena').touched : null
  }

  get cuentaNoValido(){
    return this.cuentaCampoRequerido || this.cuentaBancariaFormato 
  }
  get cuentaCampoRequerido(){
    return this.datosBancariosForm.get('cuenta').errors ? this.datosBancariosForm.get('cuenta').errors.required && this.datosBancariosForm.get('cuenta').touched : null
  }
  get cuentaBancariaFormato(){
    return this.datosBancariosForm.get('cuenta').errors ? this.datosBancariosForm.get('cuenta').errors.cuentaBancariaFormatoNoValido && this.datosBancariosForm.get('cuenta').touched : null
  }

  private cuentaBancariaValida(control:FormControl):{[s:string]:boolean}{
    const pattern = "^ES[0-9]{22}$"
    if(!control.value.match(pattern)){
      return {
        cuentaBancariaFormatoNoValido:true
      }
    }
    return null
  }
}
