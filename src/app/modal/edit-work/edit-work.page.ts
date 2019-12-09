import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-work',
  templateUrl: './edit-work.page.html',
  styleUrls: ['./edit-work.page.scss'],
})
export class EditWorkPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  
  closeModal() {
    this.modalCtrl.dismiss();
  }
}
