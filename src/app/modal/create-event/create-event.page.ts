import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  createEventForm : FormGroup;

  timezoneOffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds

  minStartDate: string = (new Date(Date.now() - this.timezoneOffset)).toISOString();
  maxStartDate: string = (new Date((new Date().setFullYear(new Date().getFullYear() + 2)) - this.timezoneOffset)).toISOString();

  minEndDate: string = new Date().toISOString();
  maxEndDate: string = new Date().toISOString();

  constructor(private fb: FormBuilder) {
    this.createEventForm = this.fb.group({
      eventName: ['', Validators.required],
      details: [''],
      location: [''],
      startDate: [''],
      startTime: [''],
      endDate: [''],
      endTime: ['']
    });
   }

  ngOnInit() {
    console.log("Min start date: ", this.minStartDate);
    console.log("Max start date: ", this.maxStartDate);
  }

  createEvent() {
    console.log(this.createEventForm.value)
  }

}
