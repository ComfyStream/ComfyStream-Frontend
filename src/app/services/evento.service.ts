import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Evento } from '../models/evento';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class EventoService {
  

  constructor(private http: HttpClient,
    private router:Router) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  getEventoPorID(id:string):Promise<Evento>{
    return new Promise<Evento>(
      resolve=> {
        this.http.post(`${base_url}/evento`, {_id:id}).subscribe(data=>{
          const evento = data["evento"];
          resolve(evento);

        });
     })
 }

 getMisEventos():Promise<Evento[]>{
  const headers = new HttpHeaders({
    'x-token': localStorage.getItem('token')
  });

  return new Promise<Evento[]>(
    resolve=> {
      this.http.get(`${base_url}/mis-eventos`,{
        headers
      }).subscribe(data=>{
        const eventos = data["eventos"];
        resolve(eventos);
      });
   })
}

  getEventos():Promise<Evento[]>{
    return new Promise<Evento[]>(
      resolve => {
        this.http.get(`${base_url}/eventos`,{
        }).subscribe(data=>{
          const eventos = data["eventos"];
          resolve(eventos);
        });
      })
  }

  
  crearEvento( formData: any, imagen:File):Promise<any>{

    let datos = new FormData();
    datos.append("img", imagen,imagen.name )
    datos.append("titulo", formData.titulo )
    datos.append("descripcion", formData.descripcion )
    datos.append("categoria", formData.categoria )
    datos.append("subcategoria", formData.subcategoria )
    datos.append("esPersonal", formData.esPersonal )
    datos.append("fecha", formData.fecha )
    datos.append("duracion", formData.duracion )
    datos.append("precio", formData.precio )


    return new Promise<any> (resolve=> {

      this.http.post(`${ base_url }/evento/nuevo`, datos,{
        headers: { 
          'x-token': this.token
        }
      } )
      .subscribe(data =>{
        const evento= data;
        console.log(evento);
        resolve(evento);
      });
    } )
  }


  crearSalaZoom( datos: any):Promise<any>{

    return new Promise<any> (resolve=> {

      this.http.post(`${ base_url }/zoom/room`, datos,{
        headers: { 
          'x-token': this.token
        }
      } )
      .subscribe(data =>{
        const evento= data;
        Swal.fire('Guardado', 'Cuenta de Zoom vinculada correctamente', 'success');
        resolve(evento);
        this.router.navigate(['/mis-eventos'])
      }, (err) => {
        console.log(err)
        Swal.fire('Algo salió mal', err.error.msg, 'error');
      });
    })
  }

}
