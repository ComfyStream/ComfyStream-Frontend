import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-datos-bancarios',
  templateUrl: './datos-bancarios.component.html',
  styleUrls: ['./datos-bancarios.component.css']
})
export class DatosBancariosComponent implements OnInit {
  public usuario: Usuario;
  public datosBancariosForm: FormGroup;
  constructor(private usuarioService : UsuarioService,private fb:FormBuilder) { }

  async ngOnInit(){
    if(localStorage.getItem("token")){
      this.usuario = await (this.usuarioService.getUsuarioPorId(localStorage.getItem("usuarioId")));
      this.datosBancariosForm= this.fb.group({
        titular: [ this.usuario.titularCuenta , Validators.required ],
        cuenta: [ this.usuario.cuentaBancariaIBAN, [ Validators.required,Validators.maxLength(24),Validators.minLength(24)] ],
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
    
    
  }

  get titularNoValido(){
    return this.titularCampoRequerido
  }
  get titularCampoRequerido(){
    return this.datosBancariosForm.get('titular').errors ? this.datosBancariosForm.get('titular').errors.required && this.datosBancariosForm.get('titular').touched : null
  }
  get contrasenaValido(){
    return this.cuentaCampoRequerido 
  }
  get contrasenaCampoRequerido(){
    return this.datosBancariosForm.get('contrasena').errors ? this.datosBancariosForm.get('contrasena').errors.required && this.datosBancariosForm.get('contrasena').touched : null
  }

  get cuentaNoValido(){
    return this.cuentaCampoRequerido || this.validarCuentaM || this.validarCuentaMin
  }
  get cuentaCampoRequerido(){
    return this.datosBancariosForm.get('cuenta').errors ? this.datosBancariosForm.get('cuenta').errors.required && this.datosBancariosForm.get('cuenta').touched : null
  }
  get validarCuentaM(){
    return this.datosBancariosForm.get('cuenta').errors ? this.datosBancariosForm.get('cuenta').errors.maxlength && this.datosBancariosForm.get('cuenta').touched : null
  }
  get validarCuentaMin(){
    return this.datosBancariosForm.get('cuenta').errors ? this.datosBancariosForm.get('cuenta').errors.minlength && this.datosBancariosForm.get('cuenta').touched : null
  }
}
