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
          .then(
            result => {
              this.afs.collection(`users`).add(user);
              result.user.updateProfile(
                {
                  displayName: user.fullName
                }
              )
            }
          )
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

  /**
   * LinkedIn Login Services
   */
  getCustomToken(email) {
    return this.http.post(
      "https://us-central1-linkedin-auth-ff668.cloudfunctions.net/getCredential", {
        email: email
      }, {}
    );
  }

  signInWithToken(token) {
    return this.afAuth.auth.signInWithCustomToken(token);
  }
  
  updateUserInfo(user) {
    const updateProfilePromise = this.afAuth.auth.currentUser.updateProfile({
      displayName: user.displayName,
      photoURL: user.profile
    });
    const updateEmailPromise = this.afAuth.auth.currentUser.updateEmail(
      user.email
    );
    return Promise.all([updateProfilePromise, updateEmailPromise]);
  }
}