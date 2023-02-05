import { Component, OnInit } from '@angular/core';
const leaflet = require('leaflet');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cherish';

  private map: any;

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    this.map = leaflet.map('map').setView([51.505, -0.09], 13);

    const tiles = leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

  }
}
