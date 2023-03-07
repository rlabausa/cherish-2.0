import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IAddPostRequest, IAddPostResponse, IGetPostsResponse } from '../models/cherish-data.model';

@Injectable({
  providedIn: 'root'
})
export class CherishDataService {
  private BASE_URL = environment.cherishDataApiUrl;
  private IMAGES_ENDPOINT = 'photos';
  private POSTS_ENDPOINT = 'posts';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllPosts() {
    return this.httpClient.get<IGetPostsResponse>(`${this.BASE_URL}/${this.POSTS_ENDPOINT}`);
  }

  getPostById(id: number) {
    return this.httpClient.get(`${this.BASE_URL}/${this.POSTS_ENDPOINT}/${id}`);
  }

  addPost(requestBody: IAddPostRequest) {
    return this.httpClient.post(`${this.BASE_URL}/${this.POSTS_ENDPOINT}`, requestBody);
  }

  addImage(file: File) {
    const data = new FormData();
    data.append('file', file);

    return this.httpClient.post<IAddPostResponse>(`${this.BASE_URL}/${this.IMAGES_ENDPOINT}`, data, {
      reportProgress: true
    });
  }
}
