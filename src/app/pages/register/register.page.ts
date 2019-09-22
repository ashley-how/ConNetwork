import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public onRegisterForm: FormGroup;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  confirmPasswordType: string = 'password';
  confirmPasswordIcon: string = 'eye-off';

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.onRegisterForm = this.formBuilder.group({
      'fullName': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],
      'comfirmPassword': [null, Validators.compose([
        Validators.required
      ])]
    },
    {
      'validator': this.checkPasswords
    });
  }

  checkPasswords( group: FormGroup) {
    let password = group.get("password").value;
    let confirmPassword = group.get("comfirmPassword").value;
    return password == confirmPassword ? null : {'mismatch': true};
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordType = this.confirmPasswordType === 'text' ? 'password' : 'text';
    this.confirmPasswordIcon = this.confirmPasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  async signUp() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    await loader.present();

    var user = {
      fullname: this.onRegisterForm.value.fullName,
      email: this.onRegisterForm.value.email,
      password: this.onRegisterForm.value.password
    };

    this.authService.register(user);
    loader.onWillDismiss().then(() => {
      this.navCtrl.navigateRoot('/');
    });
  }

  goToLogin() {
    this.navCtrl.navigateRoot('/');
  }

}