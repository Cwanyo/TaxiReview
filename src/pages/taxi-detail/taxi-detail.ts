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
  taxiImages: Observable<any[]>;
  
  taxiReviewExist: boolean = false;
  taxiImagesExist: boolean = false;

  constructor(
    public navCtrl: NavController,
    private afDB:AngularFireDatabase,
    navParams: NavParams
  ) {
    this.taxiLicensePlate = navParams.get('taxiLicensePlate');
    this.getTaxiReviews();
  }

  getTaxiReviews(){
    //get last new 20 reviews
    this.taxiReviews = this.afDB.list('Taxis/'+this.taxiLicensePlate+'/UserReviews', ref=> ref.limitToLast(20)).valueChanges();
    //get lat new 5 images
    this.taxiImages = this.afDB.list('Taxis/'+this.taxiLicensePlate+'/Images', ref => ref.limitToLast(5)).valueChanges();

    let subImages = this.taxiImages.subscribe(imagesData => {
      if(imagesData.length == 0){
        console.log("Taxi image not exist");
        this.taxiImagesExist = false;
      }else{
        console.log("Taxi image exist");
        this.taxiImagesExist = true;
      }
      subImages.unsubscribe();
    });

    let subReviews = this.taxiReviews.subscribe(taxiData => {
      if(taxiData.length == 0){
        console.log("Taxi review not exist");
        this.taxiReviewExist = false;
      }else{
        console.log("Taxi review exist");
        this.taxiReviewExist = true;
      }
      //Get user Data
      taxiData.forEach( r => {
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
        let subPic = this.afDB.object('Users/'+r.UserId+'/Image').valueChanges().subscribe(userData => {
          if(userData !== null){
            console.log("User image exist");
            this.usersPic[r.UserId] = userData;
          }else{
            console.log("User image not exist");
          }
          subPic.unsubscribe();
        });
      });
      subReviews.unsubscribe();
    });

  }

  goToAddReview(params){
    if (!params) params = {};
    this.navCtrl.push(AddReviewPage);
  }
  
}
