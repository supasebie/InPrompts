import { Component, HostListener, ViewChild } from '@angular/core';
import { map, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss'],
})
export class MemberEditComponent {
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  member: Member | null = null;
  user: User | null = null;
  active: number = 1;

  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private toastr: ToastrService
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
      },
    });
  }

  updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({next: _ => {
      this.toastr.success('Profile updated');
      this.editForm?.reset(this.member);
    }})
  }
}
