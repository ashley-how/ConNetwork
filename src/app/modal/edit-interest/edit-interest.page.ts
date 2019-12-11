import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-interest',
  templateUrl: './edit-interest.page.html',
  styleUrls: ['./edit-interest.page.scss'],
})
export class EditInterestPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
