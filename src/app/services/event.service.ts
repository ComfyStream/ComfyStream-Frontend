import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class EventService {

  constructor(private http: HttpClient) { }

  /* getEventByID(id:string):Promise<Event>{
    return new Promise<Event>(
      resolve=> {
        this.http.get(`${base_url}/events/event/${id}`).subscribe(data=>{
          const event = data["event"];
          resolve(event);

        });
     })
 }

  getEvents():Promise<Event[]>{
    return new Promise<Event[]>(
      resolve => {
        this.http.get(`${base_url}/events/`,{
        }).subscribe(data=>{
          const events = data["events"];
          resolve(events);
        });
      })
  } */
}
