import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { InputModalComponent } from '../input-modal/input-modal.component';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {


  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  // init map with current location coordinates
  initMap(latLong: any) {
    const loader = new Loader({
      apiKey: environment.GOOGLE_MAP_API_KEY
    });

    loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: latLong,
        zoom: 10,
      });
      const marker = new google.maps.Marker({
        position: latLong,
        map: map,
        title: "Current location",
      });

      marker.setMap(map);
    });


  }

  // get user curent location coordinates
  getCurrentLocation() {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = {
        lat: coords.latitude, lng: coords.longitude
      };
      this.initMap(latLong);
    });
  }


  openModal() {
    this.modalService.show(InputModalComponent);
  }





}
