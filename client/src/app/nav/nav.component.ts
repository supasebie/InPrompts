import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
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
      },
      error: (error) => {
        // error.forEach((value: string) => {
        //   this.toastr.error(value);
        // })


        // if(error.length > 1)
        // {
        //   for(const value of error)
        //   {
        //     this.toastr.error(value);
        //   }
        // } else
        // {
        //   this.toastr.error(error.error);
        // }

        // if (error.error.errors !== undefined) {
        //   Object.entries(error.error.errors as Array<string>).forEach(
        //     ([key, value], index) => {
        //       this.toastr.error(value);
        //     }
        //   );
        // } else {
        //   this.toastr.error(error.error);
        // }
      }
    });
  }

  logout() {
    this.accountService.logout(), (this.model = {});
    this.router.navigateByUrl('/');
    this.toastr.info('Keep on promptin!');
  }
}
