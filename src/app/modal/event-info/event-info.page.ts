import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.page.html',
  styleUrls: ['./event-info.page.scss'],
})
export class EventInfoPage implements OnInit {
  eventInfo;
  allParticipants = [];

  constructor(
    private modalCtrl: ModalController,
    private userService: UserService
    ) { }

  ngOnInit() {
    console.log("Current event: ", this.eventInfo);
    this.eventInfo.participants.forEach(participantId => {
      this.userService.getUserById(participantId).subscribe(user => {
        console.log("User: ", user);
        this.allParticipants.push(user);
      });
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
