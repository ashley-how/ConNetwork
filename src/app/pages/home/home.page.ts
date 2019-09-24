import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { EventsService } from 'src/app/services/events.service';
import { Observable } from 'rxjs';
import { Event } from '../../model/Event';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {
  public events: Observable<Event[]>;

  constructor(
    public navCtrl: NavController, private eventsService: EventsService,
    private authService: AuthService) { }

    ngOnInit() {
      this.events = this.eventsService.getEvents();
    }

    registerForEvent(event: Event) {
      var user = this.authService.getCurrentUser();
      this.eventsService.addParticipant(event, user.uid);
    }
}
