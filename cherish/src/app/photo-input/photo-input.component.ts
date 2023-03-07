import { Component, EventEmitter, Output } from '@angular/core';
import { delay, retry } from 'rxjs';
import { fileHasValidImageSignature, readDataUrl } from '../common/file.utilities';
import { IAddPostResponse } from '../models/cherish-data.model';
import { CherishDataService } from '../services/cherish-data.service';

@Component({
  selector: 'app-photo-input',
  templateUrl: './photo-input.component.html',
  styleUrls: ['./photo-input.component.scss']
})
export class PhotoInputComponent {
  selectedFile: File;
  readonly FILE_INPUT_ID = 'fileInput';
  readonly FILE_PREVIEW_ID = 'filePreview';

  @Output() photoUploadSuccess = new EventEmitter<number>();
  @Output() photoUploadError = new EventEmitter<any>();

  constructor(
    private cherishDataSvc: CherishDataService
  ) {

  }

  openFileSelector(event: any) {
    event.preventDefault();

    const fileInput: HTMLInputElement = document.querySelector(`#${this.FILE_INPUT_ID}`);
    fileInput.click();
  }

  async handleFileSelection(event: any) {
    const preview: HTMLImageElement = document.querySelector(`#${this.FILE_PREVIEW_ID}`);
    preview.src = '';

    const target = event.target as HTMLInputElement;
    const fileList: FileList = target.files;
    const file: File = fileList[0];

    this.selectedFile = file;

    const fileIsValid = await fileHasValidImageSignature(file);

    if (fileIsValid) {
      preview.src = await readDataUrl(file);

      this.cherishDataSvc.addImage(file)
        .pipe(
          retry(3),
          delay(1000)
        )
        .subscribe({
          next: (res: IAddPostResponse) => {
            this.photoUploadSuccess.emit(res.id);
          },
          error: () => {
            alert('File upload failed.  Please try again later.')
          }
        });

    } else {
      alert('File format is invalid.  Please select another image to upload.')
    }
  }
}
