import { Component, OnInit } from '@angular/core';
import { IPost } from '../models/cherish-data.model';
import { CherishDataService } from '../services/cherish-data.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {
  posts: IPost[];

  constructor(
    private cherishDataSvc: CherishDataService
  ) {

  }

  ngOnInit(): void {
    this.cherishDataSvc.getAllPosts()
      .subscribe({
        next: (response) => {
          this.posts = response._embedded.postList;
        }
      })
  }
}
