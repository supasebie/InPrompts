import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        // this.router.navigateByUrl('/members')
      },
      error: (error) => {
        // console.log(error);
        if (error.error.errors !== undefined) {
          Object.entries(error.error.errors as Array<string>).forEach(
            ([key, value], index) => {
              this.toastr.error(value);
            }
          );
        } else {
          this.toastr.error(error.error);
        }
      },
      complete: () => console.log('Request Complete'),
    });
  }

  logout() {
    this.accountService.logout(), (this.model = {});
    this.router.navigateByUrl('/');
    this.toastr.info('Keep on promptin!');
  }
}
