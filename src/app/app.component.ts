import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Menu
import { ProfilePage } from '../pages/profile/profile';
import { FindTaxiPage } from '../pages/find-taxi/find-taxi';
import { RecentViewPage } from '../pages/recent-view/recent-view';
import { MyReviewPage } from '../pages/my-review/my-review';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = FindTaxiPage;

  constructor(
    public platform: Platform, 
    public menu: MenuController,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    //TODO - can set pages varible here, it can store {title:'',component:''}
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  //TODO - can optimize as openPage(page) function and use pages varible as pages referance
  goToProfile(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ProfilePage);
  }goToFindTaxi(params){
    if (!params) params = {};
    this.navCtrl.setRoot(FindTaxiPage);
  }goToRecentView(params){
    if (!params) params = {};
    this.navCtrl.setRoot(RecentViewPage);
  }goToMyReview(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MyReviewPage);
  }
  
}
