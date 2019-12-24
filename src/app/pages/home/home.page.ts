import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
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
    public navCtrl: NavController, private eventService: EventService,
    private authService: AuthService, private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, private userService: UserService) { }

    async ngOnInit() {
      const loader = await this.loadingCtrl.create();
      await loader.present();
      this.eventService.getEventsByUser().subscribe(myEvents => {
        console.log("My registered events: ", myEvents);
        this.myEvents = myEvents;

        this.eventService.getEvents().subscribe(events => {
          this.events = events;
        });
        loader.dismiss();
      });
    }

    isEventRegistered(event: Event): boolean {
      return this.eventService.isEventRegisteredByUser(event);
    }

    async registerForEvent(event: Event) {
      console.log("Event to register: ", event);
      const loader = await this.loadingCtrl.create();
      await loader.present();

      var user = this.userService.getCurrentUser();
      this.eventService.addParticipant(event.id, user.uid);
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

    async unregisterForEvent( event: Event) {
      console.log("Event to unregister: ", event);
      const loader = await this.loadingCtrl.create();
      await loader.present();

      var user = this.userService.getCurrentUser();
      this.eventService.removeParticipant(event.id, user.uid);
      console.log("Index to add back:", this.events.findIndex(evt => evt.id == event.id));
      this.events.push(event);
      console.log(this.events);
      loader.dismiss();

      const toast = await this.toastCtrl.create({
        showCloseButton: true,
        message: 'Event unregistered.',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
    }
}
