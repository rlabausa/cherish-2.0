import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { IGeoSearchResult, IMarkerDragResult } from '../models/leaflet-geosearch.model';
import { IMapLocationDialogResult } from '../models/map-location-dialog.model';
import { GeocoderService } from '../services/geocoder.service';

@Component({
  selector: 'app-map-location-dialog',
  templateUrl: './map-location-dialog.component.html',
  styleUrls: ['./map-location-dialog.component.scss']
})
export class MapLocationDialogComponent {
  result: IMapLocationDialogResult;

  constructor(
    private geocoderSvc: GeocoderService
  ) {
    this.result = {};
  }

  onLocationSelected(event: IGeoSearchResult) {
    this.result.location = event.location?.label;
    this.result.longitude = event.location?.x;
    this.result.latitude = event.location?.y;
  }

  onMarkerDrag(event: IMarkerDragResult) {
    this.result.longitude = event.location?.lng;
    this.result.latitude = event.location?.lat;

    if (
      (this.result.longitude === null || this.result.longitude === undefined) ||
      (this.result.latitude === null || this.result.latitude === undefined)
    ) {
      alert('Error: Location data could not be processed.  Please try again later.');
      return;
    }

    this.geocoderSvc
      .reverseLookup(this.result.latitude, this.result.longitude)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.result.location = res.display_name;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
        }
      });
  }
}
