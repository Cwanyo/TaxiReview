import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TaxiDetailPage } from '../taxi-detail/taxi-detail';

//Fire
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-recent-view',
  templateUrl: 'recent-view.html'
})
export class RecentViewPage {

  private user: firebase.User;

  private myRecentViewExist: boolean = false;
  
  private myRecentViews: Observable<any>;
  private taxisImage = {};
  
  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private afDB:AngularFireDatabase
  ) {
    console.log("RecentViewPage");
    this.userAuth();
  }

  userAuth(){
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        this.user = null;
        return;
      }
      this.user = user;
      this.getListOfMyRecentViews();
    });
  }

  getListOfMyRecentViews(){
    console.log("getListOfMyRecentViews");

    const myRecentViewsRef = this.afDB.list('Users/'+this.user.uid+'/Recents/', ref => ref.orderByValue());
    this.myRecentViews = myRecentViewsRef.snapshotChanges();
    
    let sub = this.myRecentViews.subscribe(myRecentViewDate => {

      if(myRecentViewDate.length == 0){
        console.log("My recent view not exist");
        this.myRecentViewExist = false;
      }else{
        console.log("My recent view exist");
        this.myRecentViewExist = true;
      }

      myRecentViewDate.forEach(r=>{
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