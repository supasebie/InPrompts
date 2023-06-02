import { Component } from '@angular/core';
import { map, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss'],
})
export class MemberEditComponent {
  member: Member | null = null;
  user: User | null = null;
  active: number = 1;

  constructor(
    private accountService: AccountService,
    private memberService: MembersService
  ) {
    // You can avoid this by setting user | null and initializing to null
    // this.accountService.currentUser$.pipe(take(1)).subscribe({
    //   next: (response) => {
    //     if (response) {
    //       this.user = response;
    //       console.log(this.user);
    //     }
    //   },
    // });

    // Load the member via a method for reusability, instead of in the constructor
    // if (this.user) {
    //   this.memberService.getMember(this.user.username).subscribe({
    //     next: (response) => {
    //       if (response) {
    //         this.member = response;
    //         console.log(this.member);
    //       }
    //     },
    //   });
    // }

    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (response) => {
        this.user = response;
      },
    });
    
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    if (!this.user) return;

    this.memberService.getMember(this.user.username).subscribe({
      next: (response) => {
        this.member = response;
        console.log(this.member)
      },
    });
  }
}
