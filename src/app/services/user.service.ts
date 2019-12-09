import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userCollection: AngularFirestoreCollection;
  
  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection('users');
   }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  getCurrentUserInfo() {
    return this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {
            id,
            ...data
          };
        });
      })
    );
  }
}
