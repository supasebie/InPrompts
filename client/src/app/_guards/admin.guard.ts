import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const adminGuard: CanActivateFn = () => {
  const accountService: AccountService = inject(AccountService);
  const router: Router = inject(Router);
  const toastr: ToastrService = inject(ToastrService);

  return accountService.currentUser$.pipe(
    map((user) => {
      if (user) {
        if (user.roles.includes('Admin') || user.roles.includes('Moderator')) 
        {
          return true;
        }
      }
      router.navigateByUrl('');
      toastr.error('Unauthorized');
      return false;
    })
  );
};
