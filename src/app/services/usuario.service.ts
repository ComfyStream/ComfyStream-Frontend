import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient,
    private router: Router) { }


    get token(): string {
      return localStorage.getItem('token') || '';
    }
  login( formData: any ): Promise<string> {
      return new Promise<string>(resolve => {
        this.http.post(`${base_url}/login`,formData).subscribe(data => {
          const msg = data['msg']
          if(msg === 'Login realizado con exito'){
            localStorage.setItem('token', data['token'])
            localStorage.setItem('usuarioId', data['usuarioId'])
            localStorage.setItem('profesional', data['profesional'])
          }
          resolve(msg)
        })
      })
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  getUsuarioPorId(id:string):Promise<any>{
    return new Promise<any>(
      resolve=> {
        this.http.get(`${base_url}/usuario/${id}`).subscribe(data=>{
          const usuario = data["usuario"];
          resolve(usuario);
        });
     })
 }

  enlazarZoom():Promise<any>{
    return new Promise<any>(
      resolve=> {
        this.http.get(`${base_url}/zoom/token`,{
          headers: { 
            'x-token': this.token
          }
        }).subscribe(res=>{
          
          const data = res["data"];
          resolve(data);
  
        });
     })
  }


  almacenarUsuarioZoom( formData: any ): Promise<string> {
    return new Promise<string>(resolve => {
      this.http.post(`${base_url}/zoom/token`,formData,{
        headers: { 
          'x-token': this.token
        }
      }).subscribe(res=>{
        const data = res["data"];
        Swal.fire('Guardado', 'Cuenta de Zoom vinculada correctamente', 'success');
        resolve(data);
        this.router.navigate(['/'])
      }, (err) => {
        console.log(err)
        Swal.fire('Algo salió mal', err.error.msg, 'error');
      });
    })
  }


  getUsuarioZoom( ): Promise<string> {
    return new Promise<any>(
      resolve=> {
        this.http.get(`${base_url}/usuarioZoom`,{
          headers: { 
            'x-token': this.token
          }
        }).subscribe(data=>{
          
          const usuarioZoom = data["usuarioZoom"];
          resolve(usuarioZoom);

        });
     })
  }

  borrarUsuarioZoom(): Promise<string> {
    return new Promise<string>(resolve => {
      this.http.delete(`${base_url}/zoom/token`,{
        headers: { 
          'x-token': this.token
        }
      }).subscribe(res=>{
        const data = res["data"];
        Swal.fire('Guardado', 'Cuenta de Zoom desvinculada correctamente', 'success');
        resolve(data);
        this.router.navigate(['/'])
      }, (err) => {
        console.log(err)
        Swal.fire('Algo salió mal', err.error.msg, 'error');
      });
    })
  }


}


