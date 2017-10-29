import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddReviewPage } from '../add-review/add-review';

//Fire
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-taxi-detail',
  templateUrl: 'taxi-detail.html'
})
export class TaxiDetailPage {

  usersName = {};
  usersPic = {};
  public taxiLicensePlate: string = '';

  taxiReviews: Observable<any[]>;
  reviewExist: boolean = false;

  constructor(
    public navCtrl: NavController,
    private afDB:AngularFireDatabase,
    navParams: NavParams
  ) {
    this.taxiLicensePlate = navParams.get('taxiLicensePlate');
    this.getTaxiReviews();
  }

  getTaxiReviews(){
    this.taxiReviews = this.afDB.list('Taxis/'+this.taxiLicensePlate+'/UserReviews').valueChanges();
    //this.taxiReviews = this.afDB.list('Taxis/'+this.taxiLicensePlate+'/UserReviews', ref=> ref.orderByKey().limitToFirst(1)).valueChanges();

    //**
    let sub = this.taxiReviews.subscribe(taxiData => {

      //Get user Data
      taxiData.forEach( r => {
        this.reviewExist = true;
        //Get user name
        console.log("Get user name");
        let subName = this.afDB.object('Users/'+r.UserId+'/Name').valueChanges().subscribe(userData => {
          if(userData !== null){
            console.log("User name exist");
            this.usersName[r.UserId] = userData;
          }else{
            console.log("User name not exist");
          }
          subName.unsubscribe();
        });
        //Get user picture
        console.log("Get user pic");
        let subPic = this.afDB.object('Users/'+r.UserId+'/Photo').valueChanges().subscribe(userData => {
          if(userData !== null){
            console.log("User photo exist");
            this.usersPic[r.UserId] = userData;
          }else{
            console.log("User photo not exist");
          }
          subPic.unsubscribe();
        });
      });
      //--
      sub.unsubscribe();
    });
  }

  goToAddReview(params){
    if (!params) params = {};
    this.navCtrl.push(AddReviewPage);
  }
  
}
