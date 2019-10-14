import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
    ) {}

  logout() {
    this.authService.logout().then(() => {
      this.navCtrl.navigateRoot('~/');
    });
  }
}
