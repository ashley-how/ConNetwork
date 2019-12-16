import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-interest',
  templateUrl: './add-interest.page.html',
  styleUrls: ['./add-interest.page.scss'],
})
export class AddInterestPage implements OnInit {
  addInterestForm: FormGroup;
  currentUser;

  timezoneOffset = (new Date()).getTimezoneOffset() * 60000;

  maxStartDate: string = (new Date(Date.now() - this.timezoneOffset)).toISOString();

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private userService: UserService
  ) {
    this.currentUser = this.userService.getCurrentUser();
    this.addInterestForm = this.fb.group({
      interest: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  async saveChanges() {
    this.userService.updateUserInfo(this.addInterestForm.value, "interest");
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(async l => {
      const toast = await this.toastCtrl.create({
        showCloseButton: true,
        message: 'New interest is added successfully.',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
    });
    this.modalCtrl.dismiss();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
