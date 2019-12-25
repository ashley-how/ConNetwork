import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { HTTP } from "@ionic-native/http/ngx";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private http: HTTP
  ) {}

  register(user) {
    return new Promise < firebase.auth.UserCredential > (() => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(createdUser => {
          createdUser.user.updateProfile({
            displayName: user.fullName
          });

          var userProfile = {
            email: user.email,
            name: user.fullName 
          }

          this.afs.doc(`users/${createdUser.user.uid}`).set(userProfile);
        })
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      })
  }

  login(user) {
    return firebase.auth()
      .signInWithEmailAndPassword(user.email, user.password)
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}