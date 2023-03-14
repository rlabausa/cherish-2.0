import { Component, Input } from '@angular/core';
import { IPost } from '../models/cherish-data.model';
import { CherishDataService } from '../services/cherish-data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  readonly PHOTO_URL = this.cherishDataSvc.PHOTO_URL_BASE;
  
  @Input() post: IPost;
  constructor(
    private cherishDataSvc: CherishDataService
  ) {
    
  }

}
