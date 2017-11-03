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

  public taxiLicensePlate: string = '';

  private usersName = {};
  private usersPic = {};
  public taxiReviews: Observable<any[]>;
  public taxiImages: Observable<any[]>;
  public calTaxiOverallRating = {
    Cleanness:'none',
    Politeness:'none',
    Service:'none'
  }
  
  private taxiReviewExist: boolean = false;
  private taxiImagesExist: boolean = false;

  constructor(
    public navCtrl: NavController,
    private afDB:AngularFireDatabase,
    navParams: NavParams
  ) {
    this.taxiLicensePlate = navParams.get('taxiLicensePlate');
    console.log("Find Taxi",this.taxiLicensePlate);
    this.getTaxiReviews();
    this.getTaxiImages();
  }

  getTaxiImages(){
    //get last new 5 images
    this.taxiImages = this.afDB.list('Taxis/'+this.taxiLicensePlate+'/Images', ref => ref.limitToLast(5)).valueChanges();
    
    this.taxiImages.subscribe(imagesData => {
      if(imagesData.length == 0){
        console.log("Taxi image not exist");
        this.taxiImagesExist = false;
      }else{
        console.log("Taxi image exist");
        this.taxiImagesExist = true;
      }
    });
  }

  getTaxiReviews(){
    this.taxiReviews = this.afDB.list('Taxis/'+this.taxiLicensePlate+'/UserReviews').valueChanges();

    this.taxiReviews.subscribe(taxiReview => {
      if(taxiReview.length == 0){
        console.log("Taxi review not exist");
        this.taxiReviewExist = false;
      }else{
        console.log("Taxi review exist");
        this.taxiReviewExist = true;
      }

      let c = 0;
      let p = 0;
      let s = 0;
      //Get user Data
      console.log("Get user name and image");
      taxiReview.forEach( r => {
        //Get each user rating
        c += parseInt(r.Cleanness);
        p += parseInt(r.Politeness);
        s += parseInt(r.Service);
        //Get user name
        let subName = this.afDB.object('Users/'+r.UserId+'/Name').valueChanges().subscribe(userData => {
          if(userData !== null){
            console.log("User name exist");
            this.usersName[r.UserId] = userData;
          }else{
            console.log("User name not exist");
          }
          subName.unsubscribe();
        });
        //Get user image
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
      //Calc overall rating
      this.calTaxiOverallRating.Cleanness = parseFloat(''+Number((c/taxiReview.length))).toFixed(2);
      this.calTaxiOverallRating.Politeness = parseFloat(''+Number((p/taxiReview.length))).toFixed(2);
      this.calTaxiOverallRating.Service = parseFloat(''+Number((s/taxiReview.length))).toFixed(2);
    });
  }

  goToAddReview(params){
    if (!params) params = {};
    this.navCtrl.push(AddReviewPage,{taxiLicensePlate: this.taxiLicensePlate});
  }
  
}
