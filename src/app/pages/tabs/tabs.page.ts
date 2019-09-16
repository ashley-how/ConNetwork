import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateEventPage } from 'src/app/modal/create-event/create-event.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  value = 0;

  constructor(private modalController: ModalController) {}

  async openCreateEventModal() {
    const createEventModal = await this.modalController.create({
      component: CreateEventPage,
      componentProps: {
        customId: this.value
      }
    });
  }
}
