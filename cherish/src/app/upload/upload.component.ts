import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

}
