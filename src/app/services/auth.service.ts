import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
    ) { }

  register(user) {
    return new Promise<firebase.auth.UserCredential>(() => {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(
        () => {
          this.afs.collection(`/user`).add(user);
      }
      )
    })
    .catch(error => {
      console.error(error);
      throw new Error(error);
    })
  }

  login(user){
    return new Promise<firebase.auth.UserCredential>(() => {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then()
    })
  }

  logout(){
    return new Promise(() => {
      this.afAuth.auth.signOut()
      .then(() => {
      }).catch((error) => {
        console.log(error);
      });
    })
  }
}
