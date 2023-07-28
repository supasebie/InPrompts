import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent {
  @ViewChild('messageForm') messageForm?: NgForm
  @Input() messages: Message[] = [];
  @Input() username: string = '';
  messageContent = '';

  constructor(private messageService:MessageService){}
  
  ngOnInit() : void
  {
  }

  sendMessage(){
    this.messageService.createMessage(this.username, this.messageContent).subscribe({next: (response) => {
      if(response)
      {
        this.messages.push(response);
        this.messageForm?.resetForm();
      }
    }});
  }

}
