import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TaxiDetailPage } from '../taxi-detail/taxi-detail';

@Component({
  selector: 'page-recent-view',
  templateUrl: 'recent-view.html'
})
export class RecentViewPage {

  constructor(
    public navCtrl: NavController
  ) {
    console.log("RecentViewPage");
  }
  goToTaxiDetail(params){
    if (!params) params = {};
    this.navCtrl.push(TaxiDetailPage);
  }
  
}
