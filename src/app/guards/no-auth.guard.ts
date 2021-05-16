import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor( private usuarioService:UsuarioService,
    private router:Router ){ }
  async ngOnInit(){
    
  }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      if(localStorage.getItem('token')){
        this.router.navigateByUrl("/");
        return false;
      }else{
        return true;
      }

  }
  
}
