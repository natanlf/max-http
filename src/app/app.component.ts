import { Post } from './post.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http.post<{ name: string }>(
      `https://ng-complete-guide-9de3d-default-rtdb.firebaseio.com/posts.json`,
      postData).subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http.get<{ [key: string]: Post }>(`https://ng-complete-guide-9de3d-default-rtdb.firebaseio.com/posts.json`)
    .pipe(map((responseData: {[key: string]: Post}) => {
      const postsArray: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({ ...responseData[key], id: key});
        }
      }
      return postsArray;
    }))
    .subscribe(responseData => {
      this.loadedPosts = responseData;
    });
  }
}
