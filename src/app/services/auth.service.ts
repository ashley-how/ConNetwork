import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth, 
    private firebaseService: FirebaseService
    ) { }

  register(user) {
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(
        res => resolve(res),
        err => reject(err)),
        (newUserCredential: firebase.auth.UserCredential) => {
          firebase.firestore().doc(`/user/${newUserCredential.user.uid}`).set({ user });
      }
    })
    .catch(error => {
      console.error(error);
      throw new Error(error);
    })
  }

  login(user){
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
  }

  logout(){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signOut()
      .then(() => {
        resolve();
      }).catch((error) => {
        reject();
      });
    })
  }
}
