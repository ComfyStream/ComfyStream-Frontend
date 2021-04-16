import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  form:FormGroup
  esProfesional:boolean = false
  imagenSubir: File;
  emailEnUso:boolean = false
  cuentaBancariaEnUso:boolean = false

  constructor(private fb:FormBuilder, private usuarioService:UsuarioService, private router:Router) {
    this.iniciarForm()
   }

  //Cambio de formularios
  iniciarForm(){
    this.form = this.fb.group({
      nombre:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(4)]],
      fechaNacimiento:['', [Validators.required, this.fechaAnteriorAHoy]],
      img:[, [Validators.required]],
      profesional:[false]
    })
  }

  iniciarFormConValores(value:any){
    this.form = this.fb.group({
      nombre:[value['nombre'], [Validators.required]],
      email:[value['email'], [Validators.required, Validators.email]],
      password:[value['password'], [Validators.required, Validators.minLength(4)]],
      fechaNacimiento:[value['fechaNacimiento'], [Validators.required, this.fechaAnteriorAHoy]],
      img:[, [Validators.required]],
      profesional:[false]
    })
  }

  profesionalForm(value:any){
    this.form = this.fb.group({
      nombre:[value['nombre'], [Validators.required]],
      email:[value['email'], [Validators.required, Validators.email]],
      password:[value['password'], [Validators.required, Validators.minLength(4)]],
      fechaNacimiento:[value['fechaNacimiento'], [Validators.required, this.fechaAnteriorAHoy]],
      img:[, [Validators.required]],
      profesional:[true],
      sector:['', [Validators.required]],
      descripcion:['', [Validators.required]],
      cuentaBancariaIBAN:['', [Validators.required, this.cuentaBancariaValida]],
      titularCuenta:['', [Validators.required]],
    })
  }

  //Validaciones síncronas
  get nombreRequerido(){
    return this.form.get('nombre').errors ? this.form.get('nombre').errors.required && this.form.get('nombre').touched : null
  }

  get emailNoValido(){
    return this.emailRequerido || this.emailFormatoNoValido || this.emailEnUso
  }
  get emailRequerido(){
    return this.form.get('email').errors ? this.form.get('email').errors.required && this.form.get('email').touched : null
  }
  get emailFormatoNoValido(){
    return this.form.get('email').errors ? this.form.get('email').errors.email && this.form.get('email').touched : null
  }
  
  get passwordNoValido(){
    return this.passwordRequerido || this.passwordLongitud
  }
  get passwordRequerido(){
    return this.form.get('password').errors ? this.form.get('password').errors.required && this.form.get('password').touched : null
  }
  get passwordLongitud(){
    return this.form.get('password').errors ? this.form.get('password').errors.minlength && this.form.get('password').touched : null
  }

  get fechaNoValido(){
    return this.fechaNacimientoRequerido || this.fechaFechaAnteriorAHoy
  }
  get fechaNacimientoRequerido(){
    return this.form.get('fechaNacimiento').errors ? this.form.get('fechaNacimiento').errors.required && this.form.get('fechaNacimiento').touched : null
  }
  get fechaFechaAnteriorAHoy(){
    return this.form.get('fechaNacimiento').errors ? this.form.get('fechaNacimiento').errors.fechaAnteriorAHoy && this.form.get('fechaNacimiento').touched : null
  }

  get sectorRequerido(){
    return this.form.get('sector').errors ? this.form.get('sector').errors.required && this.form.get('sector').touched : null
  }

  get descripcionRequerido(){
    return this.form.get('descripcion').errors ? this.form.get('descripcion').errors.required && this.form.get('descripcion').touched : null
  }

  get cuentaBancariaIbanNoValido(){
    return this.cuentaBancariaIBANRequerido || this.cuentaBancariaFormato || this.cuentaBancariaEnUso
  }
  get cuentaBancariaIBANRequerido(){
    return this.form.get('cuentaBancariaIBAN').errors ? this.form.get('cuentaBancariaIBAN').errors.required && this.form.get('cuentaBancariaIBAN').touched : null
  }
  get cuentaBancariaFormato(){
    return this.form.get('cuentaBancariaIBAN').errors ? this.form.get('cuentaBancariaIBAN').errors.cuentaBancariaFormatoNoValido && this.form.get('cuentaBancariaIBAN').touched : null
  }

  get titularCuentaRequerido(){
    return this.form.get('titularCuenta').errors ? this.form.get('titularCuenta').errors.required && this.form.get('titularCuenta').touched : null
  }

  get imgCampoRequerido(){
    return this.form.get('img').errors ? this.form.get('img').errors.required && this.form.get('img').touched : null
  }


  //Validaciones personalizadas
  private fechaAnteriorAHoy(control:FormControl):{[s:string]:boolean}{
    let f = Date.parse(control.value)
    let hoy = new Date().getTime()
    if(f > hoy){
      return {
        fechaAnteriorAHoy:true
      }
    }
    return null
  }

  private cuentaBancariaValida(control:FormControl):{[s:string]:boolean}{
    const pattern = "^[A-Z]{2}[0-9]{18}$"
    if(!control.value.match(pattern)){
      return {
        cuentaBancariaFormatoNoValido:true
      }
    }
    return null
  }


  //Cambios
  cambiaForm(){
    const profesional = this.form.value.profesional
    if(profesional){
      this.profesionalForm(this.form.value)
    }else{
      this.iniciarFormConValores(this.form.value)
    }
  }

  cambiarImagen( event ) {
    const file = event.target.files[0];
    this.imagenSubir = file;
    
  }

  async submit(){
    if(this.form.valid){
      const datos = this.form.value;
      const msg = await this.usuarioService.registro(datos, this.imagenSubir)
      
      if(msg == "El email ya está en uso"){
        this.emailEnUso = true
      }else if(msg == "Esta cuenta bancaria ya está en uso"){
        this.cuentaBancariaEnUso = true
      }else{
        this.router.navigateByUrl("/login")
      }
    }else{
      this.form.markAllAsTouched()
    }
  }

}
