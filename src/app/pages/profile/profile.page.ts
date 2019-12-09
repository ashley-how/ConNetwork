import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { EditProfilePage } from 'src/app/modal/edit-profile/edit-profile.page';
import { EditWorkPage } from 'src/app/modal/edit-work/edit-work.page';
import { EditSchoolPage } from 'src/app/modal/edit-school/edit-school.page';
import { EditInterestPage } from 'src/app/modal/edit-interest/edit-interest.page';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  currentUser;
  currentUserInfo;
  works = ["DNV GL", "AXA", "Capri by Fraser"];
  schools = ["NTU", "Meridian JC", "Changkat Changi Secondary School"];
  interests = ["Blockchain", "Web development", "C#", "Angular", "Soccer"];

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
    // this.works = this.currentUserInfo.works;
    // this.schools = this.currentUserInfo.schools;
    // this.interests = this.currentUserInfo.interests;
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
