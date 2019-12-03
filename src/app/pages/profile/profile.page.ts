import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  currentUser;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private userService: UserService
    ) {}

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    console.log("Current user: ", this.currentUser)
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
