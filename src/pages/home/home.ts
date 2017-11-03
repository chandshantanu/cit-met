import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { googlemaps } from 'googlemaps';
import { GeocodeProvider } from '../../providers/geocode/geocode';

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
  
  constructor(public navCtrl: NavController,
  private geocode:GeocodeProvider
  ) {

  }
  ngOnInit() {
    this.acService = new google.maps.places.AutocompleteService();
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
      //console.log('modal > getPlacePredictions > status > ', status);
      self.autocompleteItems = [];
      predictions.forEach(function (prediction) {
        self.autocompleteItems.push(prediction);
      });
    });
  }
  async chooseItem(item){
    console.log(item)
    //this.geocode.get_geocode(item)
    //var response= await this.h
  }


}
