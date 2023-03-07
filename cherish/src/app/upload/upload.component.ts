import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { fileHasValidImageSignature, readDataUrl } from '../common/file.utilities';
import { MapLocationDialogComponent } from '../map-location-dialog/map-location-dialog.component';
import { IAddPostResponse } from '../models/cherish-data.model';
import { IMapLocationDialogResult } from '../models/map-location-dialog.model';
import { CherishDataService } from '../services/cherish-data.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  selectedFile: File;
  imageIsUploaded = false;

  form: FormGroup = this.fb.group({
    author: ['', Validators.required],
    locationName: [{ value: '', disabled: true }, Validators.required],
    latitude: ['', Validators.required],
    longitude: ['', Validators.required],
    title: ['', Validators.required],
    body: ['', Validators.required],
    photoId: ['', Validators.required]
  });

  get latitude() {
    return this.form.get('latitude');
  }

  get longitude() {
    return this.form.get('longitude');
  }

  get locationName() {
    return this.form.get('locationName');
  }

  get photoId() {
    return this.form.get('photoId');
  }


  constructor(
    private cherishDataSvc: CherishDataService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

  }

  onSubmit() {
    this.cherishDataSvc
      .addPost(this.form.getRawValue())
      .subscribe({
        next: () => {
          alert('Post successfully saved!');
        },
        error: () => {
          alert('Error: Post could not be created.  Please try again later.');
        }
      })
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
            this.locationName?.setValue(result.location);
            this.latitude?.setValue(result.latitude);
            this.longitude?.setValue(result.longitude);
          }
        })
  }

  setPhotoIdInForm(id: number) {
    this.photoId.setValue(id);
  }

  setPhotoUploadError(){
    this.photoId.setValue(null);
    this.photoId.updateValueAndValidity(); 
  }

}
