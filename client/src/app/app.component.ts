import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'InPrompts';
  users: any;

  constructor(
    private http: HttpClient,
    public accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (response) => (this.users = response),
    });
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
