import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Event } from 'src/app/models/event';


@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {

  @Input() event: Event;
  @Output() eventSelected: EventEmitter<string>;

  constructor(){
    this.eventSelected = new EventEmitter();
  }

  async ngOnInit() {
  }

  showEvent(){
    this.eventSelected.emit(this.event._id);
  }

}