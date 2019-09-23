import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EventsService } from 'src/app/services/events.service';
import { Observable } from 'rxjs';
import { Event } from '../../model/Event';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {
  public events: Observable<Event[]>;

  constructor(
    public navCtrl: NavController, private eventsService: EventsService) { }

    ngOnInit() {
      this.events = this.eventsService.getEvents();
    }

}
