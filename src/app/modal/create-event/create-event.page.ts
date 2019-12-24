import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, LoadingController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import * as moment from 'moment';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  createEventForm : FormGroup;

  timezoneOffset = (new Date()).getTimezoneOffset() * 60000;

  minStartDate: string = (new Date(Date.now() - this.timezoneOffset)).toISOString();
  maxStartDate: string = (new Date((new Date().setFullYear(new Date().getFullYear() + 2)) - this.timezoneOffset)).toISOString();

  minStartTime: string = (new Date(Date.now() - this.timezoneOffset)).toISOString();

  minEndDate: string = (new Date(Date.now() - this.timezoneOffset)).toISOString();
  maxEndDate: string = (new Date((new Date().setFullYear(new Date().getFullYear() + 2)) - this.timezoneOffset)).toISOString();

  constructor(
    private fb: FormBuilder, 
    private modalCtrl: ModalController,
    private eventService: EventService, 
    private loadingCtrl: LoadingController
    ) {
    this.createEventForm = this.fb.group({
      eventName: ['', Validators.required],
      details: [''],
      location: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: ['', Validators.required],
      endTime: ['', Validators.required]
    });
   }

  ngOnInit() {
    console.log("Min start date: ", this.minStartDate);
    console.log("Max start date: ", this.maxStartDate);
  }

  async createEvent() {
    const loader = await this.loadingCtrl.create();
    await loader.present();

    this.createEventForm.get("startDate").patchValue(moment(new Date(this.createEventForm.get("startDate").value)).format("DD MMM YYYY"));
    this.createEventForm.get("startTime").patchValue(moment(new Date(this.createEventForm.get("startTime").value)).format("HH:MM"));

    this.createEventForm.get("endDate").patchValue(moment(new Date(this.createEventForm.get("endDate").value)).format("DD MMM YYYY"));
    this.createEventForm.get("endTime").patchValue(moment(new Date(this.createEventForm.get("endTime").value)).format("HH:MM"));
    console.log(this.createEventForm.value)
   
    this.eventService.addEvent(this.createEventForm.value);
    loader.dismiss();
    this.closeModal();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
