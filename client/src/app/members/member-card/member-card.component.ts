import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent {
  @Input() member: Member | undefined;
  constructor(
    private memberService: MembersService,
    private toast: ToastrService
  ) {}

  addLike(member: Member) {
    this.memberService.addLike(member.userName).subscribe({
      next: (_) => {
        this.toast.success('You have liked ' + member.knownAs);
      } 
    });
  }
}
