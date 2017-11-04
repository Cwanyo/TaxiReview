import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Menu
import { ProfilePage } from '../pages/profile/profile';

import { TabsPage } from './../pages/tabs/tabs';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = TabsPage;

  private user;

  constructor(
    public platform: Platform, 
    public menu: MenuController,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private afAuth: AngularFireAuth
  ) {
    this.initializeApp();

    this.afAuth.authState.subscribe(user => {
      if (!user) {
        this.user = null;
        return;
      }
      this.user = user;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  goToProfile(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ProfilePage);
  }
  goToFindTaxi(params){
    if (!params) params = {};
    this.navCtrl.push(TabsPage,{index: "0"})
  }
  goToRecentView(params){
    if (!params) params = {};
    this.navCtrl.push(TabsPage,{index: "1"})
  }
  goToMyReview(params){
    if (!params) params = {};
    this.navCtrl.push(TabsPage,{index: "2"})
  }
  
}
