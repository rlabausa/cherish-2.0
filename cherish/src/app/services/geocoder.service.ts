import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IPlaceOutput } from '../models/nominatim-osm.model';

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
    const params = {
      lat: latitude,
      lon: longitude,
      format: 'json'
    };

    return this.httpClient.get<IPlaceOutput>(`${environment.nominatimApiUrl}/${this.REVERSE_LOOKUP_ENDPOINT}`, { params: params });
  }
}
