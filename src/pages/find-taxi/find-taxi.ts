import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { TaxiDetailPage } from '../taxi-detail/taxi-detail';

//Fire
import { AngularFireDatabase } from 'angularfire2/database';

import firebase from 'firebase';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { RestApiProvider } from '../../providers/rest-api/rest-api';

@Component({
  selector: 'page-find-taxi',
  templateUrl: 'find-taxi.html'
})
export class FindTaxiPage {

  public gotTaxiImage: boolean = false;
  public gotTaxiDatail: boolean = false;

  public taxiPhotoOrientation: number;

  public taxiPhoto: string;
  public rawTaxiPhoto: string;
  public taxiDetail: any;

  public photoPath: string;
  public taxiPhotoURL: string;

  public taxiLicensePlate: string;

  public storage = firebase.storage();

  constructor(
    public navCtrl: NavController,
    private afDB:AngularFireDatabase,
    private camera: Camera,
    public restApiProvider: RestApiProvider,
    public platform: Platform 
  ) {
    console.log("FindTaxiPage");
  }

  resetValue(){
    this.gotTaxiImage = false;
    this.gotTaxiDatail = false;
    
    this.taxiPhotoOrientation = null;

    this.taxiPhoto = '';
    this.rawTaxiPhoto = '';
    this.taxiDetail = null;

    this.photoPath = '';
    this.taxiPhotoURL = '';

    this.taxiLicensePlate = '';
  }

  takePhotoViaHTML(event){
    //reset input field and pic
    this.resetValue();  
    
    let pic = event.target.files[0];
    if(pic == null || pic.type!="image/jpeg"){
      console.log("image not in jpeg");
      return;
    }
    //GET orientation
    this.orientationReader(pic);
    //RESET picture orientation
    this.resetOrientationPhoto(pic);
  }

  resetOrientationPhoto(picture){
    var img = new Image();
    img.onload = this._handleResetOrientationPhotoLoaded.bind(this);
    img.src = URL.createObjectURL(picture);
  }

  _handleResetOrientationPhotoLoaded(readerEvt){
    var img = readerEvt.path[0];
    var width = img.width,
    height = img.height,
    canvas = document.createElement('canvas'),
    ctx = canvas.getContext("2d");

     // set proper canvas dimensions before transform & export
     if (4 < this.taxiPhotoOrientation && this.taxiPhotoOrientation < 9) {
      canvas.width = height;
      canvas.height = width;
    } else {
      canvas.width = width;
      canvas.height = height;
    }

    // transform context before drawing image
    switch (this.taxiPhotoOrientation) {
      case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
      case 3: ctx.transform(-1, 0, 0, -1, width, height ); break;
      case 4: ctx.transform(1, 0, 0, -1, 0, height ); break;
      case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
      case 6: ctx.transform(0, 1, -1, 0, height , 0); break;
      case 7: ctx.transform(0, -1, -1, 0, height , width); break;
      case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
      default: break;
    }

    // draw image
    ctx.drawImage(img, 0, 0);

    //export to base64 jpeg and reduce image quality 50%
    let imageData = canvas.toDataURL("image/jpeg",0.5);
    // export base64
    this.taxiPhoto = imageData;
    
    this.rawTaxiPhoto = imageData.split("base64,")[1];
    
    this.gotTaxiImage = true;
    console.log("Took image");
    
    this.taxiLicensePlate = 'Please wait!';

    //search taxi detail
    this.searchTaxiDetail();
  }

  orientationReader(picture){
    var reader = new FileReader();
    reader.onload = this._handleOrientationLoaded.bind(this);
    reader.readAsArrayBuffer(picture);
  }

  _handleOrientationLoaded(readerEvt){
    var view = new DataView(readerEvt.target.result);
    if (view.getUint16(0, false) != 0xFFD8){
      console.log("Error Picture not jped");
      return -2;
    }
    var length = view.byteLength, offset = 2;
    while (offset < length) {
      var marker = view.getUint16(offset, false);
      offset += 2;
      if (marker == 0xFFE1) {
        if (view.getUint32(offset += 2, false) != 0x45786966){
          console.log("Error Picture not defined");
          return -1;
        } 
        var little = view.getUint16(offset += 6, false) == 0x4949;
        offset += view.getUint32(offset + 4, little);
        var tags = view.getUint16(offset, little);
        offset += 2;
        for (var i = 0; i < tags; i++)
          if (view.getUint16(offset + (i * 12), little) == 0x0112){
            let orientation = view.getUint16(offset + (i * 12) + 8, little);
            console.log("Picture orientation",orientation);
            this.taxiPhotoOrientation = orientation;
            return orientation;
          }
      }
      else if ((marker & 0xFF00) != 0xFF00) break;
      else offset += view.getUint16(offset, false);
    }
  }

  pictureReader(picture){
    var reader = new FileReader(); 
    reader.onload = this._handlePictureReaderLoaded.bind(this); 
    reader.readAsBinaryString(picture);
  }

  _handlePictureReaderLoaded(readerEvt) { 
    //reset input field and pic
    this.resetValue();

    var binaryString = readerEvt.target.result;
    let imageData = btoa(binaryString)
    this.taxiPhoto = 'data:image/jpeg;base64,' + imageData; 
    this.rawTaxiPhoto = imageData;

    this.gotTaxiImage = true;
    console.log("Took image");
    
    this.taxiLicensePlate = 'Please wait!';

    //search taxi detail
    this.searchTaxiDetail();
  } 
  
  takePhotoViaNative(){
    //reset input field and pic
    this.resetValue();    

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }
      
    this.camera.getPicture(options)
    .then((imageData) => {
      //set value
      this.taxiPhoto = 'data:image/jpeg;base64,' + imageData;
      this.rawTaxiPhoto = imageData;

      this.gotTaxiImage = true;
      console.log("Took image");
      
      this.taxiLicensePlate = 'Please wait!';

      //search taxi detail
      this.searchTaxiDetail();
    })
    .catch(error => console.log("Error taking photo",error));
  }

  searchTaxiDetail(){
     this.restApiProvider.getLicensePlate(this.rawTaxiPhoto)
     .then(data => {
       this.taxiDetail = data;
       console.log("Got taxiDetail",this.taxiDetail);
       //check that taxi detail is valid
       if(this.checkValidTaxiDetail()){
         this.gotTaxiDatail = true;
       }
     })
     .catch(error =>{
       console.log("Error using openalpr api",error);
     });
  }

  checkValidTaxiDetail(){
    if(this.taxiDetail.results.length == 0){
      this.taxiLicensePlate = 'Not found!';
      console.log("Invalid result from taxiDetail");
      return false;
    }else if(this.taxiDetail.results.length > 0){
      this.taxiLicensePlate = this.taxiDetail.results[0].plate;
      console.log("Valid result from taxiDetail");
      return true;
    }
  }

  uploadImage(){
    if((!this.gotTaxiImage) || (!this.gotTaxiDatail)){
      console.log("No image to upload or image did not contain any taxi");
      this.resetValue();
      return;
    }
    //set firestore path >> /images/taxis/<taxi-license-plate-number>/<file-name>.<format>
    this.photoPath = "images/taxis/"+this.taxiLicensePlate+"/"+new Date().getTime()+".jpg";
    const storageRef = this.storage.ref(this.photoPath);
    storageRef.putString(this.taxiPhoto,"data_url")
    .then(() =>{
      console.log("Uploaded image");
    })
    .then(() => {
      //get image URL
      const storageRef = this.storage.ref(this.photoPath);
      storageRef.getDownloadURL()
      .then(url =>{
        this.taxiPhotoURL = url;
        console.log("Got image URL",this.taxiPhotoURL);
      })
      .then(() => {
        //add image to taxi in firedatabase
        this.addTaxiImageToFiredatabase();
      });
    })
    .catch(error => console.log("Error",error));
  }

  addTaxiImageToFiredatabase(){
    const dbTaxiRef = this.afDB.object('Taxis/'+this.taxiLicensePlate);
    let dbTaxi = dbTaxiRef.valueChanges();
    let sub = dbTaxi.subscribe(taxiData => {

      const dbTaxiImageRef = this.afDB.list('Taxis/'+this.taxiLicensePlate+'/Images/');

        if(taxiData == null){
          console.log("Taxi not exist");
          
          dbTaxiImageRef.set(''+new Date().getTime(),this.taxiPhotoURL)
          .then(res=>console.log("Create and add new Image url to taxi in firedatabase"));
        }else{
          console.log("Taxi already exist");

          dbTaxiImageRef.set(''+new Date().getTime(),this.taxiPhotoURL)
          .then(res=>console.log("Append new Image url to taxi in firedatabase"));
        }

        sub.unsubscribe();
        //reset
        this.resetValue();
    });
  }

  isValidTaxiInfo(){
    //TODO - find a better way to valid this
    if(this.taxiLicensePlate && (this.taxiLicensePlate!='Please wait!') && (this.taxiLicensePlate!='Not found!')){
      return true;
    }
  }

  goToTaxiDetail(params){
    //store data before reset
    let tlp = this.taxiLicensePlate;
    //TODO - give user option whether they want to upload image or not
    this.uploadImage();
    
    if (!params) params = {};
    this.navCtrl.push(TaxiDetailPage,{taxiLicensePlate: tlp});
  }

}
