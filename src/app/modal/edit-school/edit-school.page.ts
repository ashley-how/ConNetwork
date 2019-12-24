import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-school',
  templateUrl: './edit-school.page.html',
  styleUrls: ['./edit-school.page.scss'],
})
export class EditSchoolPage implements OnInit {
  currentUser;
  editSchoolForm : FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private userService: UserService,
    private fb: FormBuilder
    ) {
      this.currentUser = this.userService.getCurrentUser();
      console.log("Current user: ", this.currentUser);

      this.editSchoolForm = this.fb.group({
      });
     }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
