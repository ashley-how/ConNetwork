import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  createEventForm : FormGroup;
  minStartDate: string = new Date().toISOString();
  minEndDate: string = new Date().toISOString();

  constructor(private fb: FormBuilder) {
    this.createEventForm = this.fb.group({
      eventName: ['', Validators.required],
      details: [''],
      location: [''],
      startDate: [''],
      endDate: ['']
    });
   }

  ngOnInit() {
  }

  createEvent() {
    console.log(this.createEventForm.value)
  }

}
