import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService: AccountService = inject(AccountService);
  const router: Router = inject(Router);
  const toastr: ToastrService = inject(ToastrService);
  // if(accountService.currentUser())
  // {
  //   return true;
  // }
  // else
  // {
  //   toastr.error('UNAUTHORIZED');
  //   return false;
  // }
  return accountService.currentUser$.pipe(
    map((user) => {
      if (user) {
        return true;
      } else {
        router.navigateByUrl('/');
        toastr.error('Unauthorized');
        return false;
      }
    })
  );
};
