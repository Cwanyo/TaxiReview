import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ProfilePage } from './../profile/profile';

//Fire
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-add-review',
  templateUrl: 'add-review.html'
})
export class AddReviewPage {

  public taxiLicensePlate: string = '';

  private user: firebase.User;

  public taxiReviews: Observable<any[]>;

  public Service:string;
  public Politeness:string;
  public Cleanness:string;
  public Comment:string;

  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private afDB:AngularFireDatabase,
    navParams: NavParams
  ) {
    this.taxiLicensePlate = navParams.get('taxiLicensePlate');
    this.userAuth();
  }

  userAuth(){
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        this.user = null;
        //redirect if not login
        this.navCtrl.pop();
        this.navCtrl.push(ProfilePage);
        return;
      }
      this.user = user;
    });
  }

  addReview(){
    const taxiReviewsRef = this.afDB.list('Taxis/'+this.taxiLicensePlate+'/UserReviews');
    this.taxiReviews = taxiReviewsRef.valueChanges();

    let sub = this.taxiReviews.subscribe(taxiReview => {
      let UserId = this.user.uid;
      let Service = this.Service;
      let Politeness = this.Politeness;
      let Cleanness = this.Cleanness;
      let Comment = this.Comment;

      const taxiORRef = this.afDB.object('Taxis/'+this.taxiLicensePlate+'/OverallRating');

      if(taxiReview.length == 0){
        console.log("Taxi review not exist");

        //add review
        taxiReviewsRef.set(''+new Date().getTime(), {UserId,Service,Politeness,Cleanness,Comment});
      
        //add overall rating
        taxiORRef.set({
          "Cleanness":parseFloat(''+Number((Cleanness))).toFixed(2),
          "Politeness":parseFloat(''+Number((Politeness))).toFixed(2),
          "Service":parseFloat(''+Number((Service))).toFixed(2)
        });

        console.log("Create and add new review of taxi in firedatabase");
      }else{
        console.log("Taxi review exist");
        //TODO - overwrite same user
        //add review
        taxiReviewsRef.set(''+new Date().getTime(), {UserId,Service,Politeness,Cleanness,Comment});

        let count = 1;
        let c = parseInt(Cleanness);
        let p = parseInt(Politeness);
        let s = parseInt(Service);
        //cal overall rating
        taxiReview.forEach( r => {
            count++;
            c += parseInt(r.Cleanness);
            p += parseInt(r.Politeness);
            s += parseInt(r.Service);
        });

        //add overall rating
        taxiORRef.set({
          "Cleanness":parseFloat(''+Number((c/count))).toFixed(2),
          "Politeness":parseFloat(''+Number((p/count))).toFixed(2),
          "Service":parseFloat(''+Number((s/count))).toFixed(2)
        });

        console.log("Add new review of taxi in firedatabase");
      }

      sub.unsubscribe();
    });

  }

  isValidReviewInfo(){
    if(this.Service == null || this.Politeness == null || this.Cleanness == null || this.Comment == null || this.Comment == ''){
      return false;
    }else{
      return true;
    }
  }

  submitReview(params){
    this.addReview();

    if (!params) params = {};
    this.navCtrl.pop();
  }
}
