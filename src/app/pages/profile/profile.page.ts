import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { EditProfilePage } from 'src/app/modal/edit-profile/edit-profile.page';
import { EditWorkPage } from 'src/app/modal/edit-work/edit-work.page';
import { EditSchoolPage } from 'src/app/modal/edit-school/edit-school.page';
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

  async ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    console.log("Current user: ", this.currentUser);

    const loader = await this.loadingCtrl.create();
    await loader.present();

    this.userService.getUserInfo("work").subscribe(works => {
      console.log("Works retrieved: ", works);
      this.works = works;

      this.userService.getUserInfo("school").subscribe(schools => {
        console.log("Schools retrieved: ", schools);
        this.schools = schools;

        this.userService.getUserInfo("interest").subscribe(interests => {
          console.log("Interests retrieved: ", interests);
          this.interests = interests;

          loader.dismiss();
        });
      });
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
