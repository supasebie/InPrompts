import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  model: any = {}

  constructor(public accountSerivce: AccountService) {}

  ngOnInit(): void {
  }

  login() {
    this.accountSerivce.login(this.model).subscribe({
      next: response => {
      },
      error: error => console.log(error),
      complete: () => console.log("Request Complete")
    });
    console.log(this.model);
  }

  logout() {
    this.accountSerivce.logout();
    this.model = {};
  }
}
