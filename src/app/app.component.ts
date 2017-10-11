import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ProfilePage } from '../pages/profile/profile';
import { TaxiDetailPage } from '../pages/taxi-detail/taxi-detail';
import { AddReviewPage } from '../pages/add-review/add-review';
import { MyReviewPage } from '../pages/my-review/my-review';
import { RecentViewPage } from '../pages/recent-view/recent-view';
import { FindTaxiPage } from '../pages/find-taxi/find-taxi';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = FindTaxiPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToProfile(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ProfilePage);
  }goToFindTaxi(params){
    if (!params) params = {};
    this.navCtrl.setRoot(FindTaxiPage);
  }goToTaxiDetail(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TaxiDetailPage);
  }goToAddReview(params){
    if (!params) params = {};
    this.navCtrl.setRoot(AddReviewPage);
  }goToMyReview(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MyReviewPage);
  }goToRecentView(params){
    if (!params) params = {};
    this.navCtrl.setRoot(RecentViewPage);
  }
}
