import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddReviewPage } from '../add-review/add-review';
//import { TaxiDetailPage } from '../taxi-detail/taxi-detail';

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
  }goToTaxiDetail(params){
    if (!params) params = {};
    this.navCtrl.push(TaxiDetailPage);
  }
}
