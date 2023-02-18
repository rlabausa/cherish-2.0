import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MapComponent } from '../map/map.component';
import { GeocoderService } from '../services/geocoder.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  form: FormGroup = this.fb.group({
    author: ['', Validators.required],
    location: [{ value: '', disabled: true }, Validators.required],
    latitude: ['', Validators.required],
    longitude: ['', Validators.required],
    title: ['', Validators.required],
    body: ['', Validators.required],
    image: ['', Validators.required]
  });

  get latitude() {
    return this.form.get('latitude');
  }

  get longitude() {
    return this.form.get('longitude');
  }

  get location() {
    return this.form.get('location');
  }

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private geocoderSvc: GeocoderService
  ) { }

  ngOnInit() {

  }

  onSubmit() {
    //TODO
    console.log('submitted')

    console.log(this.form)
  }

  openDialogForMap(){
    const dialogRef = this.dialog.open(MapComponent);
    const mapComponent = dialogRef.componentInstance;
    mapComponent.allowDraggableMarker = true;
    mapComponent.showMarkerOnSearch = true;
    mapComponent.showPopUpWithLocation = true;
  }
}
