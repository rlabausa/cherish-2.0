import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GeocoderService {

  private readonly REVERSE_LOOKUP_ENDPOINT = 'reverse';
  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Search OSM object by location. Reverse geocoding generates an address from a latitude and longitude.
   * @param latitude latitude (lat) of a coordinate
   * @param longitude longitude (lon) of a coordinate
   * @returns // TODO: ADD RETURN TYPE 
   */
  reverseLookup(latitude: number, longitude: number) {
    return this.httpClient.get(
      `${environment.nominatimApiUrl}/${this.REVERSE_LOOKUP_ENDPOINT}`,
      { params: { lat: latitude, lon: longitude, format: 'json' } }
    );
  }
}
