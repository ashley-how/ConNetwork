import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, ToastController } from '@ionic/angular';
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
  events: Event[] = [];

  constructor(
    public navCtrl: NavController, private eventsService: EventsService,
    private authService: AuthService, private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) { }

    ngOnInit() {
      this.eventsService.getEvents().subscribe(events => {
        this.events = events;
      });
    }

    async registerForEvent(event: Event) {
      const loader = await this.loadingCtrl.create();
      await loader.present();

      var user = this.authService.getCurrentUser();
      this.eventsService.addParticipant(event, user.uid);

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
