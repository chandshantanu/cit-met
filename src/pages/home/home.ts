import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { googlemaps } from 'googlemaps';
import { Diagnostic } from '@ionic-native/diagnostic';
import { GeocodeProvider } from '../../providers/geocode/geocode';
import { GeocoderRequest, Geocoder } from '@ionic-native/google-maps'
import { NativeGeocoder } from '@ionic-native/native-geocoder';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  autocompleteItems: any;
  autocomplete = {
    query: ''
  };
  acService: any;
  placesService: any;
  city_data: any;

  constructor(public navCtrl: NavController,
    private diagnostic: Diagnostic,
    private geocoder: NativeGeocoder,
    private alertCtrl:AlertController
  ) {

  }
  ngOnInit() {

    this.acService = new google.maps.places.AutocompleteService();
    //this.city_data = this.geocode.
    this.autocompleteItems = []
  }

  updateSearch() {
    var options = {
      types: ['(cities)']
    };
    //console.log('modal > updateSearch');
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let self = this;
    let config = {
      //types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
      input: this.autocomplete.query,
      componentRestrictions: {}
    }
    this.acService.getPlacePredictions(config, function (predictions, status) {
      //console.log('modal > getPlacePredictions > status > ', predictions);
      self.autocompleteItems = [];
      predictions.forEach(function (prediction) {
        self.autocompleteItems.push(prediction);
        //console.log(prediction.description)
        //console.log(this.acService.getPlace(prediction))
      });
    });
  }
  async chooseItem(item) {
    //console.log(item.description)
    var data = await this.geocoder.forwardGeocode(item.description)
    console.log(data)
    //this.city_data= new googlemaps.placesService
    //this.geocode.get_geocode(item.place_id)
    //var response= await this.h
  }
  async select_location() {
    this.diagnostic.requestLocationAuthorization().then((resp) => {
      switch (resp) {
        case 'GRANTED':
          //this.start_data();
          alert('Permitted')
          break;
        case 'DENIED':
          this.alert_denied();
          break;
      }
    })
  }
  alert_denied(){
    const alert1 = this.alertCtrl.create({
      title: 'Location Required',
      subTitle: 'Please enable location setting or try typing location.',
      buttons: ['Dismiss']
  });
  alert1.present();
  }


}
