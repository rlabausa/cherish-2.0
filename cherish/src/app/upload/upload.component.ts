import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MapLocationDialogComponent } from '../map-location-dialog/map-location-dialog.component';
import { IMapLocationDialogResult } from '../models/map-location-dialog.model';
import { CherishDataService } from '../services/cherish-data.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  readonly FILE_INPUT_ID = 'fileInput';

  form: FormGroup = this.fb.group({
    author: ['', Validators.required],
    locationName: [{ value: '', disabled: true }, Validators.required],
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

  get locationName() {
    return this.form.get('locationName');
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

  openFileSelector(event: any) {
    event.preventDefault();

    const fileInput: HTMLInputElement = document.querySelector(`#${this.FILE_INPUT_ID}`);
    fileInput.click();
  }

  handleFileSelection(event: any){
    const target = event.target as HTMLInputElement;
    console.log(target.files)
  }


}
