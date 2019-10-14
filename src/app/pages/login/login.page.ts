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
      password: ['Memories1', Validators.compose([
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

    console.log("User credentials: ", user);

    this.authService.login(user);
    loader.dismiss().then(() => {
      this.navCtrl.navigateRoot('/tabs');
    });
  }

  /**
   * LinkedIn Login
   */
  async linkedinLogin() {
    const loader = await this.loadingCtrl.create();
    await loader.present();

    const provider = new LinkedIn({
      clientId: environment.linkedinClientId,
      appScope: ["r_emailaddress", "r_liteprofile"],
      redirectUri: "http://localhost/callback",
      responseType: "code",
      state: this.linkedinService.getRandomState()
    });
    const oauth = new OauthCordova();

    this.platform.ready().then(() => {
      oauth
        .logInVia(provider)
        .then(success => {
          this.linkedinService
            .getAccessToken(success["code"])
            .then(data => {
              const parsedResponse = JSON.parse(data.data);
              const accessToken = parsedResponse.access_token;

              const namePromise = this.linkedinService.getName(
                accessToken
              );
              const picPromise = this.linkedinService.getProfilePic(
                accessToken
              );
              const emailPromise = this.linkedinService.getEmail(
                accessToken
              );

              Promise.all([namePromise, picPromise, emailPromise])
                .then(results => {
                  const name = results[0];
                  const pic = results[1];
                  const email = results[2];

                  console.log("LinkedIn return: ", name, email, pic);
                  this.createUser(name, email, email)
                    .then(() => {
                      loader.dismiss();
                      this.navCtrl.navigateRoot('/tabs');
                    })
                    .catch(err => {
                      console.error(err);
                      loader.dismiss();
                      this.showAlert(
                        "Error",
                        "Something went wrong"
                      );
                    });
                })
                .catch(err => {
                  loader.dismiss();
                  this.showAlert(
                    "Error",
                    "Something went wrong"
                  );
                });
            })
            .catch(err => {
              loader.dismiss();
              console.error(err);
              this.showAlert("Error", "Something went wrong");
            });
        })
        .catch(err => {
          loader.dismiss();
          console.error(err);
          this.showAlert("Error", "Something went wrong");
        });
    });
  }

  createUser(name, email, profilePicture) {
    return new Promise((resolve, reject) => {
      this.authService.getCustomToken(email).then(token => {
        console.log("Get token: ", token);
        this.authService
          .signInWithToken(token.data)
          .then(userCredentials => {
            if (userCredentials["additionalUserInfo"].isNewUser) {
              const user = {
                name: name,
                email: email,
                profile: profilePicture,
                uid: userCredentials["user"].uid
              };
              this.authService.updateUserInfo(user).then(() => {
                resolve("Done");
              });
            }
            this.navCtrl.navigateRoot('/tabs');
          });
      });
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