import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import {
  NgbNav,
  NgbNavChangeEvent,
  NgbNavOutlet,
} from '@ng-bootstrap/ng-bootstrap';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
})
export class MemberDetailComponent {
  messages: Message[] = [];
  member: Member = {} as Member;
  active: number = 1;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  @ViewChild('nav', {static: true})  nav?: NgbNav;


  constructor(
    private memberService: MembersService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe({next: (data) => {
      this.member = data['member'];
    }});

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];
    this.galleryImages = this.getImages();

    this.route.queryParams.subscribe((params) => {
          const tab = params['tab'] ? +params['tab'] : 1;
          this.selectTab(tab);
        });
  }

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     this.route.queryParams.subscribe((params) => {
  //       const tab = params['tab'] ? +params['tab'] : 1;
  //       this.selectTab(tab);
  //     });
  //   });
  // }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) {
      return;
    }
    this.memberService.getMember(username).subscribe({
      next: (response) => {
        (this.member = response), (this.galleryImages = this.getImages());
      },
    });
  }

  getImages() {
    if (!this.member) return [];
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
      });
    }
    return imageUrls;
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 4) {
      if (this.member) this.loadMessages(this.member.userName);
    }
  }

  loadMessages(username: string) {
    if (this.member)
      this.messageService.getMessageThread(username).subscribe({
        next: (response) => {
          this.messages = response;
        },
      });
  }

  selectTab(int: number) {
    if (this.member) this.loadMessages(this.member?.userName);
    this.nav?.select(int);
  }
}
