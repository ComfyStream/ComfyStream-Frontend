import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  public event: Event;
  public eventId: string;

  constructor(private eventService: EventService,
    private activatedRoute: ActivatedRoute) {
    
    }

  async ngOnInit() {

    this.activatedRoute.params.subscribe( params => {
      this.eventId = params['id']; 
    });

    let event1: Event = {
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

    let event2: Event = {
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

    /* this.event = this.eventService.getEventByID(this.eventId); */
    if (this.eventId == "605396f8a3edff5f615522e1"){
      this.event = event1;
    } else if (this.eventId == "605496fb09e32253bcf983ad"){
      this.event = event2;
    }
  }

}
