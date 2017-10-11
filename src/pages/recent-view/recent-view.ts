import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TaxiDetailPage } from '../taxi-detail/taxi-detail';
import { AddReviewPage } from '../add-review/add-review';

@Component({
  selector: 'page-recent-view',
  templateUrl: 'recent-view.html'
})
export class RecentViewPage {

  constructor(public navCtrl: NavController) {
  }
  goToTaxiDetail(params){
    if (!params) params = {};
    this.navCtrl.push(TaxiDetailPage);
  }goToAddReview(params){
    if (!params) params = {};
    this.navCtrl.push(AddReviewPage);
  }
}
