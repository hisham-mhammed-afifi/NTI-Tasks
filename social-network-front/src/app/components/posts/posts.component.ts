import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: any = [];
  constructor(private _posts: PostService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this._posts.getPosts().subscribe((data) => {
      this.posts = data;
      console.log(data);
    });
  }
}
