import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Observable } from 'rxjs';
import { Event } from '../../model/Event';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  myEvents: Event[] = [];

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.getEventsByUser().subscribe(events => {
      console.log(events);
      this.myEvents = events;
    });   
  }

}
