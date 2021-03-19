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
  loginForm:FormGroup;
  formSubmited:boolean = false;
  public auth2: any;
  loginIncorrecto:boolean = false


  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService:UsuarioService) { 
      this.loginForm = this.fb.group({
        email:['', [Validators.required]],
        password:['', Validators.required],
    
    
      });
    }
    
    login() {
  
      this.usuarioService.login(this.loginForm.value).subscribe(resp=>{ 
        // Navegar al Dashboard
        this.router.navigateByUrl('/');
        console.log(resp)
        
        }, (err)=> {
          console.log(err);
          this.loginIncorrecto = true
          Swal.fire('Error', err.error.msg, 'error');
        });
  
  
    }
 
  
}
