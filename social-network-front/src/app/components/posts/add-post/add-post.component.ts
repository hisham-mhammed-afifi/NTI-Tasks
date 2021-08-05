import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { PostService } from 'src/app/services/post/post.service';
import { TagService } from 'src/app/services/tag/tag.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  postData: any = {
    userId: '',
    title: '',
    content: '',
    categoryId: '',
    tags: [],
  };

  categories: any = [];
  tags: any = [];

  constructor(
    private _post: PostService,
    private _router: Router,
    private _categories: CategoryService,
    private _tags: TagService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getTags();
  }

  getUserInfo() {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  getToken() {
    return localStorage.getItem('jwt');
  }

  getCategories() {
    this._categories.getCategories().subscribe((data) => {
      this.categories = data;
      console.log('categories: ', data);
    });
  }
  getTags() {
    this._tags.getTags().subscribe((data) => {
      this.tags = data;
      console.log('tags: ', data);
    });
  }

  addPost(form: any) {
    const userId = this.getUserInfo()._id;
    console.log(this.postData.userId);

    this.postData = { ...form.value, userId };
    console.log(this.postData);

    this._post.addPost(this.postData).subscribe((res) => console.log(res));
    this._router.navigateByUrl('posts/show');
  }
}
