import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.component.html',
  styleUrls: ['./contrasena.component.css']
})
export class ContrasenaComponent implements OnInit {

  formSubmited:boolean = false;
  usuario :Usuario;
  

  public contrasenaForm = this.fb.group({

    password:['', Validators.required],
    nuevaPassword:['', Validators.required],
    nuevaPassword2:['', Validators.required],
    
  },{
    validators: this.passwordsIguales('nuevaPassword', 'nuevaPassword2')
  })
  

  constructor(private usuarioService: UsuarioService, 
    private fb:FormBuilder,
    private router:Router) { }

 async ngOnInit(){
  if(localStorage.getItem("token")){
    this.usuario = await (this.usuarioService.getUsuarioPorId(localStorage.getItem("usuarioId")));
  }
  }

  passwordsIguales(passName1:string, passName2:string){
    return(formGroup : FormGroup) =>{

    const pass1Control = formGroup.get(passName1);
    const pass2Control = formGroup.get(passName2);

    if(pass1Control.value===pass2Control.value){
      pass2Control.setErrors(null)
    }else{
      pass2Control.setErrors({noEsIgual:true})
    }


    }
     
  }
  contrasenasNoValidas(){
    const pass1 = this.contrasenaForm.get('nuevaPassword').value;
    const pass2 = this.contrasenaForm.get('nuevaPassword2').value;

    if(((pass1!==pass2) && this.formSubmited)|| ((pass1=="" ||pass2=="") && this.formSubmited)){
      return true;
    }else{
      return false;
    }
  }

  async cambiarContrasena(){
    if(this.contrasenaForm.invalid){
      this.contrasenaForm.markAllAsTouched()
      return;
    }
    
    const datos = this.contrasenaForm.value;
    console.log(datos);
    this.usuario = await this.usuarioService.actualizarContrasena(datos);
    
    
  }

}

