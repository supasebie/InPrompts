import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  registerMode = false;

constructor(public accountService: AccountService) {}

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(value: boolean) {
    this.registerMode = value;
  }
}
