import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { PostService } from '../_services/post.service';
import { Post } from '../_models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  registerMode = false;
  posts: Post[] | undefined;

  constructor(public accountService: AccountService, private postService: PostService) {}
  ngOnInit() {
    this.loadPosts();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(value: boolean) {
    this.registerMode = value;
  }

  loadPosts() {
    this.postService.getPosts().subscribe({next: (response) => {
      if(response)
      {
        this.posts = response;
      }
    }})
  }
}
