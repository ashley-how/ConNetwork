import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.page.html',
  styleUrls: ['./add-school.page.scss'],
})
export class AddSchoolPage implements OnInit {
  addSchoolForm: FormGroup;
  currentUser;

  timezoneOffset = (new Date()).getTimezoneOffset() * 60000;

  maxEndDate: string = (new Date((new Date().setFullYear(new Date().getFullYear() + 4)) - this.timezoneOffset)).toISOString();

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private userService: UserService
  ) {
    this.currentUser = this.userService.getCurrentUser();
    this.addSchoolForm = this.fb.group({
      schoolName: ['', Validators.required],
      location: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  async saveChanges() {
    this.userService.addUserInfo(this.addSchoolForm.value, "school");
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(async l => {
      const toast = await this.toastCtrl.create({
        showCloseButton: true,
        message: 'New school is added successfully.',
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
