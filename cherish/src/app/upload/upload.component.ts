import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeoSearchResult, MarkerDragResult } from '../models/leaflet-geosearch.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  form: FormGroup = this.fb.group({
    latitude: ['', Validators.required],
    longitude: ['', Validators.required]
  });

  get latitude() {
    return this.form.get('latitude');
  }

  get longitude() {
    return this.form.get('longitude');
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    //TODO
    console.log('INIT')
  }

  onSubmit() {
    //TODO
    console.log('submitted')

    console.log(this.form)
  }

  onLocationSelected(event: GeoSearchResult) {
    this.longitude?.setValue(event.location?.x);
    this.latitude?.setValue(event.location?.y);
  }

  onMarkerDrag(event: MarkerDragResult) {
    this.longitude?.setValue(event.location?.lng);
    this.latitude?.setValue(event.location?.lat);
  }

}
