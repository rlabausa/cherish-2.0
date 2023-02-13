import { AfterViewInit, Component } from '@angular/core';
import { tileLayer, map, Map, LatLngExpression, Icon } from 'leaflet';
import * as GeoSearch from 'leaflet-geosearch';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private readonly ATTRIBUTION = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
  private readonly DEFAULT_MAP_MAX_ZOOM = 18;
  private readonly DEFAULT_MAP_MIN_ZOOM = 3;
  private readonly DEFAULT_MAP_ZOOM = 14;
  private readonly DEFAULT_MAP_CENTER: LatLngExpression = [15.1850, 145.7467];
  private readonly DEFAULT_MARKER_ICON = new Icon({
    // iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'
    iconUrl: '/assets/img/marker.svg',
    iconSize: [32, 32]
  })

  private map!: Map;
  readonly MAP_HTML_ID = 'map';

  ngAfterViewInit(): void {
    navigator.geolocation.getCurrentPosition(
      this.handleGetCurrentPositionSuccess.bind(this),
      this.handleGetCurrentPositionError.bind(this)
    );

  }

  handleGetCurrentPositionSuccess(position: GeolocationPosition) {
    const coords = position.coords;
    const lat = coords.latitude;
    const lng = coords.longitude;
    const center: LatLngExpression = [lat, lng];

    this.drawMap(this.MAP_HTML_ID, center, this.DEFAULT_MAP_ZOOM);
  }

  handleGetCurrentPositionError(error: GeolocationPositionError) {
    console.warn(`ERROR(${error.code}): ${error.message})`);

    this.drawMap();
  }

  drawMap(
    mapId: string = this.MAP_HTML_ID,
    mapCenter: LatLngExpression = this.DEFAULT_MAP_CENTER,
    zoomLevel: number = this.DEFAULT_MAP_ZOOM,
    minZoom: number = this.DEFAULT_MAP_MIN_ZOOM,
    maxZoom: number = this.DEFAULT_MAP_MAX_ZOOM,
    attribution: string = this.ATTRIBUTION
  ) {
    //@ts-ignore
    const search = new GeoSearch.GeoSearchControl({
      provider: new GeoSearch.OpenStreetMapProvider(),
      marker: {
        icon: this.DEFAULT_MARKER_ICON,
        draggable: false
      },
      style: 'bar'
    });

    this.map = map(mapId)
      .setView(mapCenter, zoomLevel)
      .addControl(search);

    const tiles = tileLayer(environment.tileUrl, {
      maxZoom: maxZoom,
      minZoom: minZoom,
      attribution: attribution
    });

    tiles.addTo(this.map);
  }

}
