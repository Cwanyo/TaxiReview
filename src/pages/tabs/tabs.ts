import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { FindTaxiPage } from './../find-taxi/find-taxi';
import { MyReviewPage } from './../my-review/my-review';
import { RecentViewPage } from './../recent-view/recent-view';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  index: number;

  tab1Root = FindTaxiPage;
  tab2Root = RecentViewPage;
  tab3Root = MyReviewPage;

  constructor(navParams: NavParams) {
    console.log("TabsPage");
    this.index = navParams.get('index') || 0;
  }

  
}
