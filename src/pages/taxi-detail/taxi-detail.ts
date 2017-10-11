import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AddReviewPage } from '../add-review/add-review';

@Component({
  selector: 'page-taxi-detail',
  templateUrl: 'taxi-detail.html'
})
export class TaxiDetailPage {

  constructor(public navCtrl: NavController) {
  }
  goToAddReview(params){
    if (!params) params = {};
    this.navCtrl.push(AddReviewPage);
  }
  
}
