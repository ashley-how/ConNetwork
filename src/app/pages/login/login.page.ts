import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, ToastController, AlertController, LoadingController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LinkedinService } from 'src/app/services/linkedin.service';
import { LinkedIn } from "ng2-cordova-oauth/core";
import { environment } from 'src/environments/environment';
import { OauthCordova } from "ng2-cordova-oauth/platform/cordova";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;

  passwordType: string = "password";
  passwordIcon: string = "eye-off";

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private linkedinService: LinkedinService,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.onLoginForm = this.formBuilder.group({
      email: ['ashleyhowjz@gmail.com', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['Ashley95', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])]
    });
  }

  async login(onLoginForm: FormGroup): Promise < void > {
    const loader = await this.loadingCtrl.create();
    await loader.present();

    const user = {
      'email': onLoginForm.value.email,
      'password': onLoginForm.value.password
    }

    this.authService.login(user)
    .then(result => {
      if (result) {
        loader.dismiss().then(() => {
          console.log("Logging in...");
          this.navCtrl.navigateForward('/tabs');
        });
      }

      else {
        loader.dismiss().then(() => {
          this.navCtrl.navigateRoot('/');
        });
      }
    });
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Forgot Password?',
      message: 'Enter you email address to send a reset link password.',
      inputs: [{
        name: 'email',
        type: 'email',
        placeholder: 'Email'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Confirm',
        handler: async () => {
          const loader = await this.loadingCtrl.create({
            duration: 2000
          });

          loader.present();
          loader.onWillDismiss().then(async l => {
            const toast = await this.toastCtrl.create({
              showCloseButton: true,
              message: 'Email was sended successfully.',
              duration: 3000,
              position: 'bottom'
            });

            toast.present();
          });
        }
      }]
    });

    await alert.present();
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }

  async showAlert(title: string, msg: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: ["OK"]
    });

    await alert.present();
  }
}