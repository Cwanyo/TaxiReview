import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TaxiDetailPage } from '../taxi-detail/taxi-detail';

@Component({
  selector: 'page-my-review',
  templateUrl: 'my-review.html'
})
export class MyReviewPage {

  constructor(public navCtrl: NavController) {
  }
  goToTaxiDetail(params){
    if (!params) params = {};
    this.navCtrl.push(TaxiDetailPage);
  }
  
}
