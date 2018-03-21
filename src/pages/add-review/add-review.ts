import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ProfilePage } from './../profile/profile';

//Fire
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database/interfaces';

@Component({
  selector: 'page-add-review',
  templateUrl: 'add-review.html'
})
export class AddReviewPage {

  public taxiLicensePlate: string = '';

  private user: firebase.User;

  public taxiReviews: Observable<any[]>;

  public Service:number;
  public Politeness:number;
  public Cleanness:number;
  public Comment:string;

  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private afDB:AngularFireDatabase,
    navParams: NavParams
  ) {
    console.log("AddReviewPage");
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

    //let curTime = new Date().getTime().toString();

    let sub = this.taxiReviews.subscribe(taxiReview => {
      let UserId = this.user.uid;
      let Service: number = Number(this.Service);
      let Politeness: number = Number(this.Politeness);
      let Cleanness: number = Number(this.Cleanness);
      let Comment = this.Comment;
    
      if(taxiReview.length == 0){
        console.log("Taxi review not exist");
        //add review
        taxiReviewsRef.push({UserId,Service,Politeness,Cleanness,Comment})
        .then(res=>console.log("Create and add new review of taxi in firedatabase"))
        .then(() => {
          //add my review
          this.afDB.object('Users/'+this.user.uid+'/Reviews/'+this.taxiLicensePlate).set(true)
          .then(res=>console.log("Added to my review"));
        })
      }else{
        console.log("Taxi review exist");
        //Check user review already exist or not
        let currUserReview = this.afDB.list('Taxis/'+this.taxiLicensePlate+'/UserReviews',
        ref => ref.orderByChild('UserId').equalTo(this.user.uid)).snapshotChanges();

        let curSub = currUserReview.subscribe(curData => {
          if(curData.length == 0){
            console.log("Current user review never exist");
             //add review
              taxiReviewsRef.push({UserId,Service,Politeness,Cleanness,Comment})
              .then(res=>console.log("Create and add new review of taxi in firedatabase"))
              .then(() => {
                //add my review
                this.afDB.object('Users/'+this.user.uid+'/Reviews/'+this.taxiLicensePlate).set(true)
                .then(res=>console.log("Added to my review"));
              })
          }else{
            console.log("Current user review already exist",curData);
            //Delete all the previous review of the current user
            curData.forEach(c => {
              this.afDB.list('Taxis/'+this.taxiLicensePlate+'/UserReviews/'+c.key).remove()
              .then(res=>console.log("Deleted review at",c.key))
              .catch(err=>console.log("Error deleting review",err));
            });
            //add review
            taxiReviewsRef.push({UserId,Service,Politeness,Cleanness,Comment})
            .then(res=>console.log("Create and add new review of taxi in firedatabase"))
            .then(() => {
              //add my review
              this.afDB.object('Users/'+this.user.uid+'/Reviews/'+this.taxiLicensePlate).set(true)
              .then(res=>console.log("Added to my review"));
            })
          }
          curSub.unsubscribe();
        });
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
