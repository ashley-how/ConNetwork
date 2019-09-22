import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public afs: AngularFirestore) { }

  // addItem(value) {
  //   return new Promise<any>((resolve, reject) => {
  //     this.afs.collection('/users').add(value)
  //     .then(
  //       (res) => {
  //         resolve(res)
  //       },
  //       err => reject(err)
  //     )
  //   })
  // }
}
