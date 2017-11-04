import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TaxiDetailPage } from '../taxi-detail/taxi-detail';
import { ProfilePage } from './../profile/profile';

//Fire
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-my-review',
  templateUrl: 'my-review.html'
})
export class MyReviewPage {

  private user: firebase.User;

  private taxisImage = {};
  
  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private afDB:AngularFireDatabase
  ) {
    console.log("MyReviewPage");
    this.userAuth();
  }

  userAuth(){
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        this.user = null;
        return;
      }
      this.user = user;
      //this.getListOfMyReviews();
    });
  }

  getListOfMyReviews(){
    console.log("getListOfMyReviews");
  }
  /*getListOfMyReviews(){
    const myReviewsRef = this.afDB.list('Users/'+this.user.uid+'/Reviews/');
    let myReviews = myReviewsRef.snapshotChanges();
    let sub = myReviews.subscribe(myReviewsData=> {
      //this.listOfTaxis = myReviewsData;

      myReviewsData.forEach(r=>{
        const taxiImages = this.afDB.list('Taxis/'+r.key+'/Images', ref => ref.limitToLast(1)).valueChanges();
        let tiSub = taxiImages.subscribe(imagesData=>{
          if(imagesData.length == 0){
            console.log("Taxi image not exist");
            this.taxisImage[r.key] = "assets/img/taxi.png";
          }else{
            console.log("Taxi image exist");
            this.taxisImage[r.key] = imagesData;
          }
          tiSub.unsubscribe();
        });
      });

      sub.unsubscribe();
    });
  }*/

  goToTaxiDetail(params){
    if (!params) params = {};
    this.navCtrl.push(TaxiDetailPage,{taxiLicensePlate: params});
  }
  
}
