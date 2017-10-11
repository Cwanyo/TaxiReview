import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FindTaxiPage } from '../pages/find-taxi/find-taxi';
import { RecentViewPage } from '../pages/recent-view/recent-view';
import { MyReviewPage } from '../pages/my-review/my-review';
import { TaxiDetailPage } from '../pages/taxi-detail/taxi-detail';
import { AddReviewPage } from '../pages/add-review/add-review';
import { ProfilePage } from '../pages/profile/profile';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    FindTaxiPage,
    RecentViewPage,
    MyReviewPage,
    TaxiDetailPage,
    AddReviewPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FindTaxiPage,
    RecentViewPage,
    MyReviewPage,
    TaxiDetailPage,
    AddReviewPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}