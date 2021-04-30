import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate , OnInit{
  constructor( private usuarioService:UsuarioService,
    private router:Router ){ }
  async ngOnInit(){
    
  }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      if(localStorage.getItem('token')){
        if((await this.usuarioService.getUsuario()).admin){
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
