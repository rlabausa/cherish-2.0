import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IAddPostRequest, IGetPostsResponse } from '../models/cherish-data.model';

@Injectable({
  providedIn: 'root'
})
export class CherishDataService {
  private BASE_URL = environment.cherishDataApiUrl;
  private POSTS_ENDPOINT = 'posts';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllPosts() {
    return this.httpClient.get<IGetPostsResponse>(`${this.BASE_URL}/${this.POSTS_ENDPOINT}`);
  }

  getPostById(id: number){
    return this.httpClient.get(`${this.BASE_URL}/${this.POSTS_ENDPOINT}/${id}`);
  }

  addPost(requestBody: IAddPostRequest){
    return this.httpClient.post(`${this.BASE_URL}/${this.POSTS_ENDPOINT}`, requestBody);
  }
}
