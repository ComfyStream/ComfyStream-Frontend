import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Valoracion } from '../models/valoracion';

const base_url = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ValoracionService {

  constructor(private http: HttpClient,
    private router: Router) { }


    get token(): string {
      return localStorage.getItem('token') || '';
    }

  getValoracionesPorId(id:string):Promise<Valoracion[]>{
    return new Promise<Valoracion[]>(
      resolve=> {
        this.http.get(`${base_url}/valoraciones-recibidas/${id}`).subscribe(data=>{
          if(data['msg'] == "Exito"){            
          const valoraciones = data["valoraciones"];
          resolve(valoraciones);
        }
        });
     })
 }
 puedoValorar(profesionalId:string):Promise<boolean>{
  return new Promise<boolean>(
    resolve=> {
      this.http.get(`${base_url}/puede-valorar/${profesionalId}`,{
        headers: { 
          'x-token': this.token
        }
      }).subscribe(data=>{
        console.log(data);
        const puede = data["puede"];
        resolve(puede);

      });
   })
}

valorar( datos: any):Promise<Valoracion>{

  return new Promise<Valoracion> (resolve=> {

    this.http.post(`${ base_url }/valoracion/nueva`, datos,{
      headers: { 
        'x-token': this.token
      }
    })
    .subscribe(data =>{
      const msg= data["msg"];
      if(msg == "Valoración creada"){
        Swal.fire('Guardado', msg , 'success');
        resolve(data["valoracion"]);
        this.router.navigateByUrl("/detalles-profesional/"+datos.id)
      }else{
        Swal.fire('Algo ha salido mal', 'error');
        resolve(data["valoracion"]);
      }

    });
  } )
}

borrarValoracion(id:string): Promise<string> {
  return new Promise<string>(resolve => {
    this.http.delete(`${base_url}/valoracion/eliminar/${id}`,{
      headers: { 
        'x-token': this.token
      }
    }).subscribe(res=>{
      const data = res["msg"];
      if(data == "Valoración eliminada"){
        Swal.fire('Borrado', 'Valoración borrada correctamente', 'success');
        resolve(data);
        this.router.navigate(['/'])
      }else{
        Swal.fire('Error', data, 'success');
        resolve(data);
      }
     
    });
  })
}

getMisValoraciones():Promise<Valoracion[]>{
  return new Promise<Valoracion[]>(
    resolve=> {
      this.http.get(`${base_url}/mis-valoraciones`,{
        headers: { 
          'x-token': this.token
        }
      }).subscribe(data=>{
        const valoraciones = data["valoraciones"];
        resolve(valoraciones);

      });
   })
}
}
