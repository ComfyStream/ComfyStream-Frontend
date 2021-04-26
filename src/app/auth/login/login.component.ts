import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public emailIncorrecto: boolean = false;
  public passwordIncorrecta: boolean = false;
  loginForm:FormGroup;
  formSubmited:boolean = false;
  public auth2: any;
  loginIncorrecto:boolean = false;
  public confirmacionIncorrecta: boolean = false;


  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService:UsuarioService) { 
      this.loginForm = this.fb.group({
        email:['', [Validators.required]],
        password:['', Validators.required],
    
    
      });
    }
  
    get emailRequerido(){
      return this.loginForm.get('email').invalid && this.loginForm.get('email').touched
    }

    get passwordRequerido(){
      return this.loginForm.get('password').invalid && this.loginForm.get('password').touched
    }
    
    async login(){
      if(this.loginForm.valid){
        Swal.showLoading();
        const msg = await this.usuarioService.login(this.loginForm.value);
        if (msg === 'No se ha encontrado el usuario'){
          this.emailIncorrecto = true;
        }
        else if(msg === 'Password incorrecta'){
          this.passwordIncorrecta = true;
        }
        else if(msg === "Debe confirmar su cuenta"){
          this.confirmacionIncorrecta = true;
        }
        else{
          this.router.navigateByUrl('/');
        }
        Swal.close();
      }
      else{
        this.loginForm.markAllAsTouched();
      }
    }

  }
