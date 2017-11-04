import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TaxiDetailPage } from '../taxi-detail/taxi-detail';

//Fire
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-my-review',
  templateUrl: 'my-review.html'
})
export class MyReviewPage {

  private user: firebase.User;

  private myReviewsExist: boolean = false;

  private myReviews: Observable<any>;
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
      this.getListOfMyReviews();
    });
  }

  getListOfMyReviews(){
    console.log("getListOfMyReviews");

    const myReviewsRef = this.afDB.list('Users/'+this.user.uid+'/Reviews/');
    this.myReviews = myReviewsRef.snapshotChanges();
    let sub = this.myReviews.subscribe(myreviewData => {

      if(myreviewData.length == 0){
        console.log("My reviews not exist");
        this.myReviewsExist = false;
      }else{
        console.log("My reviews exist");
        this.myReviewsExist = true;
      }

      myreviewData.forEach(r=>{
        const taxiImage = this.afDB.list('Taxis/'+r.key+'/Images', ref => ref.limitToLast(1)).valueChanges();
        let imSub = taxiImage.subscribe(imageData => {
          if(imageData.length == 0){
            console.log("Taxi image not exist");
          }else{
            console.log("Taxi image exist");
            this.taxisImage[r.key] = imageData;
          }

          imSub.unsubscribe();
        });
      });

      sub.unsubscribe();
    });
  }
  
  goToTaxiDetail(params){
    if (!params) params = {};
    this.navCtrl.push(TaxiDetailPage,{taxiLicensePlate: params});
  }
  
}
