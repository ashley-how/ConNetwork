import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-work',
  templateUrl: './edit-work.page.html',
  styleUrls: ['./edit-work.page.scss'],
})
export class EditWorkPage implements OnInit {
  currentUser;
  editWorkForm : FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private userService: UserService,
    private fb: FormBuilder
    ) {
      this.currentUser = this.userService.getCurrentUser();
      console.log("Current user: ", this.currentUser);

      this.editWorkForm = this.fb.group({
      });
     }

  ngOnInit() {
  }
  
  closeModal() {
    this.modalCtrl.dismiss();
  }
}
