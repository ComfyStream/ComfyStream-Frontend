import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Evento } from "../models/evento";
import { Asistencia } from "../models/asistencia";
import Swal from "sweetalert2";

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class AsistenciaService {
  

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get usuario(): string {
    return localStorage.getItem('usuario');
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
        'usuario': this.usuario
      }
    }
  }

 getMisAsistencias(): Promise<Evento[]>{
  const headers = new HttpHeaders({
    'x-token': localStorage.getItem('token')
  });
  return new Promise<Evento[]>(
    (resolve) => {
      this.http.get(`${base_url}/mis-asistencias`,{
        headers
      }).subscribe((data) => {
        const eventos = data["eventos"];
        resolve(eventos);
      });
   })
 }

 crearAsistencia(eventoId:any): Promise<Asistencia>{
  return new Promise<Asistencia> ((resolve) => {
    this.http.post(`${ base_url }/asistencia/nuevo`, eventoId, {
      headers: {
      'x-token': this.token
    }})
    .subscribe((data) => {
      const asistencia: Asistencia = data["asistencia"]["_id"];
      const tokenActualizado = data["tokenActualizado"];
      if(tokenActualizado){
        localStorage.setItem("token", tokenActualizado);
      }
      resolve(asistencia);
      if (data["msg"] == "Exito")
      Swal.fire('Guardado', 'Asistencia confirmada', 'success');
      else
      Swal.fire('Error', 'Ha ocurrido un problema', 'error');
    });
  } ) 
 }
 

/* crearAsistencia(eventoId:string) {
    this.http.post(`${ base_url }/asistencia/nueva`,eventoId,this.headers );
  } */

  getDatosReunion(eventoId:any): Promise<any>{
    return new Promise<any>(
      (resolve) => {
        this.http.post(`${base_url}/zoom/datosReunion`,eventoId,{
          headers: {
          'x-token': this.token
        }}).subscribe((data) => {
          const zoomDatosUsuarios = data["zoomDatosUsuarios"];
          resolve(zoomDatosUsuarios);
        });
     })
   }


   getTodasAsistencias(): Promise<any[]>{
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token')
    });
    return new Promise<any[]>(
      (resolve) => {
        this.http.get(`${base_url}/asistencias/pagos`,{
          headers
        }).subscribe((data) => {
          const asistencias = data["asistencias"];
          resolve(asistencias);
        });
     })
   }


}
