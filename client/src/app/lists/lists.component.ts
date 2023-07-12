import { Component } from '@angular/core';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';
import { UserParams } from '../_models/userParams';
import { map } from 'rxjs';
import { Pagination } from '../_models/pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent {
  members: Partial<Member[]> | undefined;
  userParams: UserParams | undefined;
  pagination: Pagination | undefined;

  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit() {
    this.loadLikes();
  }

  loadLikes() {
    if (this.userParams) {
      this.memberService.setUserParams(this.userParams);
      this.memberService.getLikes(this.userParams.predicate, this.userParams.pageNumber, this.userParams.pageSize)
      .subscribe({
        next: response => {
          this.members = response.result
          this.pagination = response.pagination
        }
      })
    }
  }

  pageChanged(event: any) {
    if (this.userParams) {
      this.userParams.pageNumber = event;
      this.memberService.setUserParams(this.userParams);
    }
    this.loadLikes();
  }
}
