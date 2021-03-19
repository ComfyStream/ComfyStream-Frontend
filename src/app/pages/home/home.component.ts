import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public events: Event[] = [];
  public fecha = new Date;

  constructor(private eventService : EventService,
    private router: Router) { }

  async ngOnInit() {

    const event1: Event = {
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

    const event2: Event = {
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

    /* this.events = await (this.eventService.getEventos()); */
    this.events.push(event1, event2);
  }

  showEvent(id: number){
    this.router.navigate(['/event', id]);
  }

}
