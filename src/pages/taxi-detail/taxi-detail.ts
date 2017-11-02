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
  public taxiOverallRating: Observable<any[]>;
  
  private taxiReviewExist: boolean = false;
  private taxiImagesExist: boolean = false;
  private taxiOverallRatingExist: boolean = false;

  constructor(
    public navCtrl: NavController,
    private afDB:AngularFireDatabase,
    navParams: NavParams
  ) {
    this.taxiLicensePlate = navParams.get('taxiLicensePlate');
    this.getTaxiReviews();
    this.getTaxiImages();
    this.getOverallRating();
  }

  getOverallRating(){
    //get taxi rating
    this.taxiOverallRating = this.afDB.object('Taxis/'+this.taxiLicensePlate+'/OverallRating').valueChanges();

    let subOR = this.taxiOverallRating.subscribe(orData => {
      if(orData == null){
        console.log("orData not exist");
        this.taxiOverallRatingExist = false;
      }else{
        console.log("orData exist");
        this.taxiOverallRatingExist = true;
      }
      subOR.unsubscribe();
    });
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
    //get last new 20 reviews
    this.taxiReviews = this.afDB.list('Taxis/'+this.taxiLicensePlate+'/UserReviews', ref=> ref.limitToLast(20)).valueChanges();

    this.taxiReviews.subscribe(taxiReview => {
      if(taxiReview.length == 0){
        console.log("Taxi review not exist");
        this.taxiReviewExist = false;
      }else{
        console.log("Taxi review exist");
        this.taxiReviewExist = true;
      }
      //Get user Data
      taxiReview.forEach( r => {
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
    });

  }

  goToAddReview(params){
    if (!params) params = {};
    this.navCtrl.push(AddReviewPage,{taxiLicensePlate: this.taxiLicensePlate});
  }
  
}
