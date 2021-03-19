import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap} from 'rxjs/operators';
import { Router } from '@angular/router';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient,
    private router: Router) { }

  login( formData: any ) {
    
    return this.http.post(`${ base_url }/login`, formData ).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token )
      })
    );

  }

  logout() {

    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');

  }

}


