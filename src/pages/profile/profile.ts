import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  //TODO - make it as object so google and facebook can share the same object
  user;

  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth
  ) {
    afAuth.authState.subscribe(user => {
      if (!user) {
        this.user = null;
        return;
      }
      this.user = user;
    });
  }

  login(provider){
    let signInProvider = null;

    switch (provider) {
      case "facebook":
        signInProvider = new firebase.auth.FacebookAuthProvider();
        break;
      case "google":
        signInProvider = new firebase.auth.GoogleAuthProvider();
        break;
    }

    this.afAuth.auth.signInWithRedirect(signInProvider)
    .then(() => {
      this.afAuth.auth.getRedirectResult()
      .then(result => console.log("Logged-in with "+provider,result))
      .catch(error => console.log("Error Sing-in with "+provider,error));
    });
  }

  logout() {
    this.afAuth.auth.signOut()
    .then(result => console.log("Sign-out",result))
    .catch(error => console.log("Error Sing-out",error));
  }

}
