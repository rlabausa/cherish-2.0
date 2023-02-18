import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MapLocationDialogComponent } from '../map-location-dialog/map-location-dialog.component';
import { IMapLocationDialogResult } from '../models/map-location-dialog.model';

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
    // image: ['', Validators.required]
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
  ) { }

  ngOnInit() {

  }

  onSubmit() {
    //TODO:
    console.log(this.form.getRawValue());
  }

  openDialogForMap(event: MouseEvent) {
    event.preventDefault();

    const dialogRef = this.dialog.open(
      MapLocationDialogComponent, {
      height: '90vh',
      width: '80vw'
    });

    dialogRef.afterClosed()
      .subscribe(
        (result: IMapLocationDialogResult) => {
          if (result) {
            this.location?.setValue(result.location);
            this.latitude?.setValue(result.latitude);
            this.longitude?.setValue(result.longitude);
          }
        })
  }
}
