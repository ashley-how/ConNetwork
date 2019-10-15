import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { HTTP } from "@ionic-native/http/ngx";
import { environment } from 'src/environments/environment';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private http: HTTP
  ) {}

  register(user) {
    return new Promise < firebase.auth.UserCredential > (() => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then(
            () => {
              this.afs.collection(`users`).add(user);
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
      .signInWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
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