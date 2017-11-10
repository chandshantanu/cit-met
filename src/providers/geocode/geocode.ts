import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the GeocodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeocodeProvider {

  constructor(public http: Http) {
    console.log('Hello GeocodeProvider Provider');
  }
  async get_geocode(id: string): Promise<any> {
    //id='ChIJL_P_CXMEDTkRw0ZdG-0GVvw'
    var response = await this.http.get('https://maps.googleapis.com/maps/api/place/details/json?placeid='+id+'&key=AIzaSyDFsIf3oZmqqVHMfpMv0fh5BHZdAZKFNdM').toPromise()
    console.log(response)
    //return response.json()
  }
}
