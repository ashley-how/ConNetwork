import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    // public popoverCtrl: PopoverController,
    // public alertCtrl: AlertController,
    // public modalCtrl: ModalController,
    // public toastCtrl: ToastController
  ) {

  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }

  // async alertLocation() {
  //   const changeLocation = await this.alertCtrl.create({
  //     header: 'Change Location',
  //     message: 'Type your Address.',
  //     inputs: [
  //       {
  //         name: 'location',
  //         placeholder: 'Enter your new Location',
  //         type: 'text'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Change',
  //         handler: async (data) => {
  //           console.log('Change clicked', data);
  //           this.yourLocation = data.location;
  //           const toast = await this.toastCtrl.create({
  //             message: 'Location was change successfully',
  //             duration: 3000,
  //             position: 'top',
  //             closeButtonText: 'OK',
  //             showCloseButton: true
  //           });

  //           toast.present();
  //         }
  //       }
  //     ]
  //   });
  //   changeLocation.present();
  // }

  // async searchFilter () {
  //   const modal = await this.modalCtrl.create({
  //     component: SearchFilterPage
  //   });
  //   return await modal.present();
  // }

  // async presentImage(image: any) {
  //   const modal = await this.modalCtrl.create({
  //     component: ImagePage,
  //     componentProps: { value: image }
  //   });
  //   return await modal.present();
  // }

  // async notifications(ev: any) {
  //   const popover = await this.popoverCtrl.create({
  //     component: NotificationsComponent,
  //     event: ev,
  //     animated: true,
  //     showBackdrop: true
  //   });
  //   return await popover.present();
  // }

}
