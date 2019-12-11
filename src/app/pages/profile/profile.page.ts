import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { EditProfilePage } from 'src/app/modal/edit-profile/edit-profile.page';
import { EditWorkPage } from 'src/app/modal/edit-work/edit-work.page';
import { EditSchoolPage } from 'src/app/modal/edit-school/edit-school.page';
import { EditInterestPage } from 'src/app/modal/edit-interest/edit-interest.page';
import { AddWorkPage } from 'src/app/modal/add-work/add-work.page';
import { AddSchoolPage } from 'src/app/modal/add-school/add-school.page';
import { AddInterestPage } from 'src/app/modal/add-interest/add-interest.page';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  currentUser;
  currentUserInfo;
  works = [];
  schools = [];
  interests = [];

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private userService: UserService,
    private modalCtrl: ModalController
    ) {}

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    console.log("Current user: ", this.currentUser);
    this.currentUserInfo = this.userService.getCurrentUserInfo();
    console.log("Current user info: ", this.currentUserInfo);

    this.userService.getUserInfo("work").subscribe(works => {
      this.works = works;
    });
  }

  async openAddWorkModal() {
    const addWorkModal = await this.modalCtrl.create({
      component: AddWorkPage
    });
    addWorkModal.present();
  }

  async openAddSchoolModal() {
    const addSchoolModal = await this.modalCtrl.create({
      component: AddSchoolPage
    });
    addSchoolModal.present();
  }

  async openAddInterestModal() {
    const addInterestModal = await this.modalCtrl.create({
      component: AddInterestPage
    });
    addInterestModal.present();
  }

  async openEditProfileModal() {
    const editProfileModal = await this.modalCtrl.create({
      component: EditProfilePage
    });
    editProfileModal.present();
  }

  async openEditWorkModal() {
    const editWorkModal = await this.modalCtrl.create({
      component: EditWorkPage
    });
    editWorkModal.present();
  }

  async openEditSchoolModal() {
    const editSchoolModal = await this.modalCtrl.create({
      component: EditSchoolPage
    });
    editSchoolModal.present();
  }

  async openEditInterestModal() {
    const editInterestModal = await this.modalCtrl.create({
      component: EditInterestPage
    });
    editInterestModal.present();
  }

  async logout() {
    const loader = await this.loadingCtrl.create();
    await loader.present();

    this.authService.logout().then(() => {
      loader.dismiss()
        .then(() => {
          console.log("Logging out...");
          this.navCtrl.navigateRoot('/');
        });
    });
  }
}
