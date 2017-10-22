import { Injectable } from '@angular/core';

import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

//import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class RestApiProvider {


  constructor(public http: HttpClient) {
    console.log('Hello RestApiProvider Provider');
  }

  getLicensePlate(image:any){
    let apiUrl = 'https://api.openalpr.com/v2/recognize_bytes';
    let params = new HttpParams();
    params = params.append('secret_key', environment.openalpr.secretKey);
    params = params.append('recognize_vehicle', '0');
    params = params.append('country', 'th');
    params = params.append('return_image', '0');
    params = params.append('topn', '5');

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type','application/json');
    headers = headers.append('Accept', 'application/json');

    return new Promise((resolve, reject) => {
      this.http.post(apiUrl, image, {headers: headers, params: params, observe: "body"})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });

  }

}
