import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  createEventForm : FormGroup;

  constructor(private fb: FormBuilder) {
    this.createEventForm = this.fb.group({
      eventName: ['', Validators.required],
      details: [''],
    });
   }

  ngOnInit() {
  }

  createEvent() {
    console.log(this.createEventForm.value)
  }

}
