import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Evento } from '../models/evento';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class EventoService {
  

  constructor(private http: HttpClient) { }

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

  /* getEventos(){

    let eventos: Evento[] = [];

    let evento1: Evento = {
      titulo: "Charla sobre inteligencia artificial",
      imagenes: [],
      descripcion: "Charla sobre el futuro de la inteligencia artificial.",
      categoria: "Informática",
      subCategoria: "Inteligencia artificial",
      precio: 15,
      esPersonal: false,
      fecha: new Date,
      enlace: "http://enlace-de-la-charla.com",
      profesional: "605392f8dad1741f1c379d59",
      _id: "605396f8a3edff5f615522e1"
    }

    let evento2: Evento = {
      titulo: "Charla sobre emprendimiento",
      imagenes: [],
      descripcion: "Charla sobre emprendimiento",
      categoria: "Empresa",
      subCategoria: "Emprendimiento",
      precio: 15,
      esPersonal: false,
      fecha: new Date,
      enlace: "http://enlace-de-la-charla.com",
      profesional: "605392f8dad1741f1c379d59",
      _id: "605496fb09e32253bcf983ad"
    }

    eventos.push(evento1, evento2);

    return eventos;
  }

  getEventoPorID(id:string){
    let res: Evento = null;
    for(let evento of this.getEventos()){
      if(evento._id == id){
        res = evento;
      }
    }
    return res;

  } */

}
