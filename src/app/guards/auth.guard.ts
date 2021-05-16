import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private usuarioService:UsuarioService,
    private router:Router ){ }
  async ngOnInit(){
    
  }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      if(localStorage.getItem('token')){
        if((await this.usuarioService.getUsuario())){
          return true;
        }else{
          this.router.navigateByUrl("/");
          return false;
        }

      }else{
        this.router.navigateByUrl("/");
        return false;
      

    }

  }
  
}
