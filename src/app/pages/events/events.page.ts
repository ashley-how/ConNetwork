import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Observable } from 'rxjs';
import { Event } from '../../model/Event';
import { ModalController } from '@ionic/angular';
import { EventInfoPage } from 'src/app/modal/event-info/event-info.page';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  myEvents: Event[] = [];

  constructor(private eventsService: EventsService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.eventsService.getEventsByUser().subscribe(events => {
      console.log(events);
      this.myEvents = events;
    });   
  }

  async openEventInfoModal() {
    const createEventModal = await this.modalCtrl.create({
      component: EventInfoPage
    });
    createEventModal.present();
  }
}
