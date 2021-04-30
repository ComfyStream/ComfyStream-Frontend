import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Evento } from "../models/evento";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { Usuario } from "../models/usuario";

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
      (resolve) => {
        this.http.post(`${base_url}/evento`, {_id:id}).subscribe((data) => {
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
    (resolve) => {
      this.http.get(`${base_url}/mis-eventos`,{
        headers
      }).subscribe((data) => {
        const eventos = data["eventos"];
        resolve(eventos);
      });
   })
}

  getEventos():Promise<Evento[]>{
    return new Promise<Evento[]>(
      (resolve) => {
        this.http.get(`${base_url}/eventos`,{
        }).subscribe((data) => {
          const eventos = data["eventos"];
          resolve(eventos);
        });
      })
  }

  getEventosDisponibles():Promise<Evento[]>{
    return new Promise<Evento[]>(
      (resolve) => {
        this.http.get(`${base_url}/evento/disponibles`,{
        }).subscribe((data) => {
          const eventos = data["respuesta"];
          resolve(eventos);
        });
      })
  }

  asistentesAlEvento(eventoId:string):Promise<Usuario[]>{
    return new Promise<Usuario[]>(
      (resolve) => {
        this.http.post(`${base_url}/evento/asistentes`, {eventoId:eventoId}, {
          headers: {
          'x-token': this.token
        }}).subscribe((data) => {
          const asistentes = data["asistentes"];
          resolve(asistentes);
        });
      })
  }

  
  crearEvento( formData: any, imagen:string):Promise<Evento>{

    let datos = new FormData();
    datos.append("img",imagen)
    datos.append("titulo", formData.titulo )
    datos.append("descripcion", formData.descripcion )
    datos.append("categoria", formData.categoria )
    datos.append("subCategoria", formData.subCategoria )
    datos.append("esPersonal", formData.esPersonal )
    datos.append("fecha", formData.fecha )
    datos.append("duracion", formData.duracion )
    datos.append("precio", formData.precio )


    return new Promise<Evento> ((resolve) => {

      this.http.post(`${ base_url }/evento/nuevo`, datos,{
        headers: { 
          'x-token': this.token
        }
      } )
      .subscribe((data) => {
        const evento= data["evento"];
        resolve(evento);
      });
    } )
  }

  actualizarEvento( formData: any, idEvento: string, imagen:string):Promise<Evento>{

    let datos = new FormData();
    datos.append("id", idEvento)
    datos.append("img",imagen)
    datos.append("titulo", formData.titulo )
    datos.append("descripcion", formData.descripcion )
    datos.append("categoria", formData.categoria )
    datos.append("subCategoria", formData.subCategoria )
    datos.append("esPersonal", formData.esPersonal )
    datos.append("precio", formData.precio )


    return new Promise<Evento> ((resolve) => {

      this.http.post(`${ base_url }/evento/editar`, datos,{
        headers: { 
          'x-token': this.token
        }
      } )
      .subscribe((data) => {
        if(data["msg"] == "El evento no es tuyo" ){
          Swal.fire('Algo salió mal', data["msg"], 'error');
        }
        const evento= data["evento"];

        Swal.fire('Guardado', 'Evento creado', 'success');
        resolve(evento);
        this.router.navigate(['/evento/'+idEvento])

      });
    } )
  }


  crearSalaZoom( datos: any):Promise<any>{


    return new Promise<any> ((resolve) => {

      this.http.post(`${ base_url }/zoom/room`, datos,{
        headers: { 
          'x-token': this.token
        }
      } )
      .subscribe((data) => {
        const evento= data;
        Swal.fire('Guardado', 'Evento creado', 'success');
        resolve(evento);
        this.router.navigate(['/mis-eventos'])
      }, (err) => {
        console.log(err)
        Swal.fire('Algo salió mal', err.error.msg, 'error');
      });
    })
  }


  buscar(datos:any):Promise<Evento[]>{
    return new Promise<Evento[]>(
      (resolve) => {
        this.http.post(`${base_url}/buscador`,datos,{
}).subscribe((data)=> {
          const eventos = data["eventosDisponibles"];
          resolve(eventos);
        });
      })
  }

  borrarEvento(idEvento:any):Promise<any>{
    return new Promise<Evento[]>(
      (resolve) => {
        this.http.delete(`${base_url}/evento/eliminar/${idEvento}`,{
          headers: { 
            'x-token': this.token
          }
        }).subscribe((data) => {
          const msg = data["msg"];
          if(msg == "Borrado con éxito"){
            Swal.fire('Evento borrado', 'Borrado con éxito', 'success');
            resolve(msg);
            this.router.navigate(['/mis-eventos']);
          }
          else{
            Swal.fire('Algo salió mal', msg, 'error');
            resolve(msg);
          }
          
        });
      })
  }
}
