import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content }
    this.http.post<{ name: string }>(
      `https://ng-complete-guide-9de3d-default-rtdb.firebaseio.com/posts.json`,
      postData).subscribe(responseData => {
        console.log(responseData);
      });
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>(`https://ng-complete-guide-9de3d-default-rtdb.firebaseio.com/posts.json`)
    .pipe(map((responseData: {[key: string]: Post}) => {
      const postsArray: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({ ...responseData[key], id: key});
        }
      }
      return postsArray;
    }));
  }
}
