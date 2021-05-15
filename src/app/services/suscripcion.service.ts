import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Suscripcion } from '../models/suscripcion';
import { UsuarioSuscripcion } from '../models/usuario-suscripcion';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {

  constructor(private http:HttpClient) { }

  suscribirse(datos:any): Promise<Suscripcion>{
    return new Promise<Suscripcion> ((resolve) => {
      this.http.post(`${ base_url }/nueva-suscripcion`, datos, {
        headers: {
        'x-token': localStorage.getItem("token")
      }})
      .subscribe((data) => {
        const suscripcion = data["suscripcion"];
        resolve(suscripcion);
      });
    }) 
  }

  estaSuscrito(idProfesional:any): Promise<Boolean>{
    return new Promise<Boolean> ((resolve) => {
      this.http.get(`${ base_url }/esta-suscrito/${idProfesional}`, {
        headers: {
        'x-token': localStorage.getItem("token")
      }})
      .subscribe((data) => {
        const suscrito = data["suscrito"];
        resolve(suscrito);
      });
    }) 
  }

  suscripcionActiva(idProfesional:any): Promise<Suscripcion>{
    return new Promise<Suscripcion> ((resolve) => {
      this.http.get(`${ base_url }/esta-suscrito/${idProfesional}`, {
        headers: {
        'x-token': localStorage.getItem("token")
      }})
      .subscribe((data) => {
        const suscripcion = data["suscripcion"];
        resolve(suscripcion);
      });
    }) 
  }

  suscriptores(): Promise<UsuarioSuscripcion[]>{
    return new Promise<UsuarioSuscripcion[]> ((resolve) => {
      this.http.get(`${ base_url }/suscriptores`, {
        headers: {
        'x-token': localStorage.getItem("token")
      }}).subscribe((data) => {
        const suscriptores = data["suscriptores"];
        resolve(suscriptores);
      });
    }) 
  }

  suscripciones(): Promise<UsuarioSuscripcion[]>{
    return new Promise<UsuarioSuscripcion[]> ((resolve) => {
      this.http.get(`${ base_url }/suscripciones`, {
        headers: {
        'x-token': localStorage.getItem("token")
      }}).subscribe((data) => {
        const profesionales = data["profesionales"];
        resolve(profesionales);
      });
    }) 
  }

}
