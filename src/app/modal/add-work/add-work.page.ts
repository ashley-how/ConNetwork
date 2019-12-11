import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-work',
  templateUrl: './add-work.page.html',
  styleUrls: ['./add-work.page.scss'],
})
export class AddWorkPage implements OnInit {
  addWorkForm: FormGroup;
  currentUser;

  timezoneOffset = (new Date()).getTimezoneOffset() * 60000;

  maxStartDate: string = (new Date(Date.now() - this.timezoneOffset)).toISOString();
  maxEndDate: string = (new Date(Date.now() - this.timezoneOffset)).toISOString();

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private userService: UserService
  ) {
    this.currentUser = this.userService.getCurrentUser();
    this.addWorkForm = this.fb.group({
      companyName: ['', Validators.required],
      jobTitle: [''],
      location: [''],
      description: [''],
      isCurrentWork: [true],
      startDate: ['', Validators.required],
      endDate: ['']
    });
   }

  ngOnInit() {
  }

  get isCurrentWork() {
    return this.addWorkForm.get('isCurrentWork').value;
  }

  async saveChanges() {
    this.userService.updateUserInfo(this.addWorkForm.value, "work");
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(async l => {
      const toast = await this.toastCtrl.create({
        showCloseButton: true,
        message: 'Work is added successfully.',
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
