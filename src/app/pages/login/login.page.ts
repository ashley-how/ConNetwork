import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;
  public loading: HTMLIonLoadingElement;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.onLoginForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])]
    });
  }

  async login(onLoginForm: FormGroup): Promise < void > {
    /**
     * Check if the user email exists in the database.
     */


    this.loading = await this.loadingCtrl.create();
    await this.loading.present();

    const user = {
      'email': onLoginForm.value.email,
      'password': onLoginForm.value.password
    }

    this.authService.login(user).then(() => {
      this.loading.dismiss().then(() => {
        this.navCtrl.navigateRoot('/tabs');
      })
    })
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

  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }
}