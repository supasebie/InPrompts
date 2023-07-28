import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../_models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = environment.apiUrl;
  

  constructor(private http: HttpClient ) { }

  getPosts() {
    return this.http.get<Post[]>(this.baseUrl + 'posts')
  }

}
