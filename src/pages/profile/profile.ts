import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  private user: firebase.User;
  
  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private afDB:AngularFireDatabase,
    private platform: Platform 
  ) {
    console.log("ProfilePage");
    this.userAuth();
  }
  
  userAuth(){
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        this.user = null;
        return;
      }
      this.user = user;
      this.UpdateUser();
    });
  }

  UpdateUser(){
    const dbUserRef = this.afDB.object('Users/'+this.user.uid);

    let Email = this.user.email;
    let Name = this.user.displayName;
    let Image = this.user.photoURL;

    dbUserRef.update({Email,Name,Image})
    .then(res=>console.log("Updated user to firedatabase"));
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

    if (this.platform.is('cordova')){
      this.afAuth.auth.signInWithRedirect(signInProvider)
      .then(() => {
        this.afAuth.auth.getRedirectResult()
        .then(result => console.log("Logged-in with "+provider,result))
        .catch(error => console.log("Error Sing-in with "+provider,error));
      });
    }else{
      this.afAuth.auth.signInWithPopup(signInProvider)
      .then(result => console.log("Logged-in with "+provider,result))
      .catch(error => console.log("Error Sing-in with "+provider,error));
    }
    

  }

  logout() {
    this.afAuth.auth.signOut()
    .then(result => console.log("Sign-out",result))
    .catch(error => console.log("Error Sing-out",error));
  }

}
