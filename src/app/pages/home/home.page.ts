import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { EventsService } from 'src/app/services/events.service';
import { Observable } from 'rxjs';
import { Event } from '../../model/Event';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {
  events: Event[] = [];
  myEvents: Event[] = [];

  constructor(
    public navCtrl: NavController, private eventsService: EventsService,
    private authService: AuthService, private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, private userService: UserService) { }

    async ngOnInit() {
      const loader = await this.loadingCtrl.create();
      await loader.present();
      this.eventsService.getEventsByUser().subscribe(myEvents => {
        console.log("My registered events: ", myEvents);
        this.myEvents = myEvents;

        this.eventsService.getEvents().subscribe(events => {
          console.log("All events: ", events);
          this.events = events;
        });
        loader.dismiss();
      });
    }

    isEventRegistered(event: Event): boolean {
      return this.eventsService.isEventRegisteredByUser(event);
    }

    async registerForEvent(event: Event) {
      console.log("Event to register: ", event);
      const loader = await this.loadingCtrl.create();
      await loader.present();

      var user = this.userService.getCurrentUser();
      this.eventsService.addParticipant(event.id, user.uid);
      console.log("Index to remove:", this.events.findIndex(evt => evt.id == event.id));
      this.events.splice(this.events.findIndex(evt => evt.id == event.id), 1);
      console.log(this.events);
      loader.dismiss();

      const toast = await this.toastCtrl.create({
        showCloseButton: true,
        message: 'Event successfully registered.',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
    }
}
