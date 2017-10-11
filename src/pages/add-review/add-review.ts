import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-add-review',
  templateUrl: 'add-review.html'
})
export class AddReviewPage {

  constructor(public navCtrl: NavController) {
  }
  submitReview(params){
    if (!params) params = {};
    this.navCtrl.pop();
  }

}
