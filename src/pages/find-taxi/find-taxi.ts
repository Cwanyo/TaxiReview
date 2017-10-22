import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TaxiDetailPage } from '../taxi-detail/taxi-detail';

//Fire
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import firebase from 'firebase';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { RestApiProvider } from '../../providers/rest-api/rest-api';

@Component({
  selector: 'page-find-taxi',
  templateUrl: 'find-taxi.html'
})
export class FindTaxiPage {

  taxis: Observable<any[]>;
  public taxiPhoto: string;
  public rawTaxiPhoto: string;
  public taxiDetail: any;
  
  public taxiLicensePlate: string = '';

  public photoPath: string;
  public photoURL: string;

  storage = firebase.storage();

  constructor(
    public navCtrl: NavController,
    private afDB:AngularFireDatabase,
    private camera: Camera,
    public restApiProvider: RestApiProvider
  ) {

    this.taxis = this.afDB.list('Taxis').valueChanges();
    console.log("taxis",this.taxis);
  }

  takePhoto(){
    //reset input field and pic
    this.taxiLicensePlate = '';
    this.taxiPhoto = '';

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }

    this.photoPath = "images/taxis/"+new Date().getTime()+".jpg";
      
    this.camera.getPicture(options)
    .then((imageData) => {
      //set value
      this.taxiPhoto = 'data:image/jpeg;base64,' + imageData;
      this.rawTaxiPhoto = imageData;
      console.log("Took imaage");
      
      this.taxiLicensePlate = 'Please wait!';

      //search taxi detail
      this.restApiProvider.getLicensePlate(this.rawTaxiPhoto)
      .then(data => {
        this.taxiDetail = data;
        console.log("Get taxiDetail",this.taxiDetail);
        this.checkValidTaxiDetail();
      })
      .catch(error =>{
        //TODO - alert user
        console.log("Error using api",error);
      });
    })
    .catch(error => console.log("Error taking photo",error));
  }

  checkValidTaxiDetail(){
    if(this.taxiDetail.results.length == 0){
      this.taxiLicensePlate = 'Not found!';
      console.log("No result from taxiDetail");
    }else if(this.taxiDetail.results.length > 0){
      this.taxiLicensePlate = this.taxiDetail.results[0].plate;
      console.log("Get result from taxiDetail");
    }
  }

  uploadPicture(){
    const storageRef = this.storage.ref(this.photoPath);
    storageRef.putString(this.taxiPhoto,"data_url")
    .then( () =>{
      console.log("Uploaded image");
      const storageRef = this.storage.ref(this.photoPath);
      storageRef.getDownloadURL()
      .then(function(url) {
        this.photoURL = url;
        console.log("URL:",url);
        // Insert url into an <img> tag to "download"
      }).catch(function(error) {
        console.log("URL error:",error);
      });
    })
    .catch(error => console.log("Error getting photo URL",error));
  }

  goToTaxiDetail(params){
    if (!params) params = {};
    this.navCtrl.push(TaxiDetailPage);
  }

}
