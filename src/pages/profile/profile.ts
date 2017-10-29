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

  //TODO - make it as object so google and facebook can share the same object
  user: firebase.User
  
  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private afDB:AngularFireDatabase,
    private platform: Platform 
  ) {
    this.userAuth();
  }
  
  userAuth(){
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        this.user = null;
        return;
      }
      this.user = user;
      this.createUser();
    });
  }

  createUser(){
    const dbUserRef = this.afDB.object('Users/'+this.user.uid);
    let dbUser = dbUserRef.valueChanges();
    let sub = dbUser.subscribe(userData => {
      if(userData !== null){
        console.log("User already exist");
      }else{
        console.log("User not exist");

        var Email = this.user.email;
        var Name = this.user.displayName;
        var Image = this.user.photoURL;

        dbUserRef.set({Email,Name,Image});
        console.log("Added new user to firedatabase");
      }
      sub.unsubscribe();
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
