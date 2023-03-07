import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { tileLayer, map, Map, LatLngExpression, Icon, popup, marker, MarkerOptions, Marker, PopupOptions, Popup } from 'leaflet';
import * as GeoSearch from 'leaflet-geosearch';
import { environment } from 'src/environments/environment.development';
import { IPost } from '../models/cherish-data.model';
import { GeoSearchEvent, IGeoSearchResult, IMarkerDragResult } from '../models/leaflet-geosearch.model';
import { CherishDataService } from '../services/cherish-data.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  @Input() mapContainerHeight = '90vh';
  @Input() allowDraggableMarker = false;
  @Input() showMarkerOnSearch = true;
  @Input() showPopUpWithLocation = false;
  @Output() locationSelected: EventEmitter<IGeoSearchResult> = new EventEmitter<IGeoSearchResult>();
  @Output() markerDragged: EventEmitter<IMarkerDragResult> = new EventEmitter<IMarkerDragResult>();

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

  constructor(
    private cherishDataSvc: CherishDataService
  ) {

  }

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
    showMarkerOnSearch: boolean = this.showMarkerOnSearch,
    allowDraggableMarker: boolean = this.allowDraggableMarker,
    showPopUpWithLocation: boolean = this.showPopUpWithLocation,
    attribution: string = this.ATTRIBUTION
  ) {

    //@ts-ignore
    const search = new GeoSearch.GeoSearchControl({
      provider: new GeoSearch.OpenStreetMapProvider(),
      showMarker: showMarkerOnSearch, // flag currently does not work for GeoSearch
      showPopup: showPopUpWithLocation,
      marker: {
        icon: this.DEFAULT_MARKER_ICON,
        draggable: allowDraggableMarker
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

    this.map.on(GeoSearchEvent.ShowLocation, this.handleLocationSelection.bind(this));
    this.map.on(GeoSearchEvent.DragEnd, this.handleMarkerDrag.bind(this));

    this.drawMarkers();

  }

  handleMarkerDrag(result: IMarkerDragResult) {
    console.log(result)
    this.markerDragged.emit(result);
  }

  handleLocationSelection(result: IGeoSearchResult) {
    console.log(result)
    this.locationSelected.emit(result);
  }

  drawMarkers() {
    this.cherishDataSvc
      .getAllPosts()
      .subscribe(
        (response) => {
          const posts = response._embedded.postList;
          console.log(posts);

          posts.forEach(post => {
            const markerLocation: LatLngExpression = [post.latitude, post.longitude];
            const popupContent = this.buildPopUpContentFromPost(post);
            const postMarker = this.buildMarkerWithPopUpContent(markerLocation, popupContent);

            postMarker.addTo(this.map);
          });
        }
      );
  }

  buildPopUpContentFromPost(post: IPost) {
    const { author, locationName, body } = post;

    const html = `
    <p>
      <b>Author:</b> ${author}<br>
      <b>Location:</b> ${locationName}
      <br>
      <br>
      ${body}
      <br>
      <img src= "${environment.cherishDataApiUrl}/photos/src/${post.photoId}" style="width: 300px"/>
      <br>
    </p> 
    `;
    const opts: PopupOptions = { content: html };
    const pop = popup(opts);

    return pop;
  }

  buildMarkerWithPopUpContent(location: LatLngExpression, popupContent: Popup): Marker {
    const opts: MarkerOptions = { icon: this.DEFAULT_MARKER_ICON };
    const mark: Marker = marker(location, opts);
    mark.bindPopup(popupContent);

    return mark;
  }

}
