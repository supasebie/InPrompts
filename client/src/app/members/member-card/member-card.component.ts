import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent {
  @Input() member: Member | undefined;
  // onlineUsers: any;
  constructor(
    private memberService: MembersService,
    private toast: ToastrService,
    public presenceService: PresenceService
  ) {}

  // ngOnInit()
  // {
  //   this.presenceService.onlineUsers$.pipe(take(1)).subscribe({next: (result) => {
  //     console.log(result);
  //   }})
  // }

  addLike(member: Member) {
    this.memberService.addLike(member.userName).subscribe({
      next: (_) => {
        this.toast.success('You have liked ' + member.knownAs);
      } 
    });
  }
}
