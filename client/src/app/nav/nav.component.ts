import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};


  constructor(public accountService: AccountService) {
  }

  ngOnInit(): void {
  }

  login(): any {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  logout(): any {
    this.accountService.logout();
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe({
      next: (response) => {
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
