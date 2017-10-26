import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { Camera } from '@ionic-native/camera';

import { environment } from '../environments/environment';

import { ProfilePage } from '../pages/profile/profile';
import { FindTaxiPage } from '../pages/find-taxi/find-taxi';
import { RecentViewPage } from '../pages/recent-view/recent-view';
import { MyReviewPage } from '../pages/my-review/my-review';

import { TaxiDetailPage } from '../pages/taxi-detail/taxi-detail';
import { AddReviewPage } from '../pages/add-review/add-review';

import { TabsPage } from './../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClientModule } from '@angular/common/http';

import { RestApiProvider } from '../providers/rest-api/rest-api';

@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    FindTaxiPage,
    RecentViewPage,
    MyReviewPage,
    TaxiDetailPage,
    AddReviewPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    FindTaxiPage,
    RecentViewPage,
    MyReviewPage,
    TaxiDetailPage,
    AddReviewPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Camera,
    RestApiProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}