import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TaxiDetailPage } from '../taxi-detail/taxi-detail';

//Fire
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-find-taxi',
  templateUrl: 'find-taxi.html'
})
export class FindTaxiPage {

  taxis: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    db:AngularFireDatabase
  ) {
    this.taxis = db.list('Taxis').valueChanges();
  }
  goToTaxiDetail(params){
    if (!params) params = {};
    this.navCtrl.push(TaxiDetailPage);
  }

}
