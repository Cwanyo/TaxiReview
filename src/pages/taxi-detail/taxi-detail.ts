import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddReviewPage } from '../add-review/add-review';

@Component({
  selector: 'page-taxi-detail',
  templateUrl: 'taxi-detail.html'
})
export class TaxiDetailPage {

  public taxiLicensePlate: string = '';

  constructor(
    public navCtrl: NavController,
    navParams: NavParams
  ) {
    this.taxiLicensePlate = navParams.get('taxiLicensePlate');
  }

  goToAddReview(params){
    if (!params) params = {};
    this.navCtrl.push(AddReviewPage);
  }
  
}
