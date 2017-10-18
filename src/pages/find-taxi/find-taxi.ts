import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TaxiDetailPage } from '../taxi-detail/taxi-detail';

//Fire
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import firebase from 'firebase';

import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-find-taxi',
  templateUrl: 'find-taxi.html'
})
export class FindTaxiPage {

  taxis: Observable<any[]>;
  public taxiPhoto: string;
  storage = firebase.storage();

  constructor(
    public navCtrl: NavController,
    private afDB:AngularFireDatabase,
    private camera: Camera
  ) {

    this.taxis = this.afDB.list('Taxis').valueChanges();
    console.log("taxis",this.taxis);
    
  }

  takePhoto(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.taxiPhoto = 'data:image/jpeg;base64,' + imageData;
     const storageRef = this.storage.ref('images/taxis/'+new Date().getTime()+'.jpg');
     storageRef.putString(this.taxiPhoto,"data_url");
    }, (err) => {
     console.log("Take a photo error",err);
    });
  }

  goToTaxiDetail(params){
    if (!params) params = {};
    this.navCtrl.push(TaxiDetailPage);
  }

}
