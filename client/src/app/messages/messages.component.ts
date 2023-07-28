import { Component } from '@angular/core';
import { MessageService } from '../_services/message.service';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  pagination?: Pagination;
  messages: Message[] | undefined;

  pageNumber: number = 1;
  pageSize: number = 10;
  container: string = 'Unread'
  loading = false;

  constructor(private messageService: MessageService){}

  ngOnInit(){
    this.loadMessages();
  }

  loadMessages(container?: string) {
    this.loading = true;
    if(container)
    {
      this.container = container;
    }
    this.messageService.getMessagesForUser(this.pageNumber, this.pageSize, this.container).subscribe({
      next: (response) => {
        this.messages = response.result;
        this.pagination = response.pagination;
        this.loading = false;
      } 
    });
  }

  pageChanged(event: any)
  {
    if(this.pageNumber != event)
    {
      this.pageNumber = event;
    this.loadMessages();
    }
  }

  loadMessageThread(recipient: string) {
    this.container = 'Conversation'
    this.messageService.getMessageThread(recipient).subscribe({next: (response) => {
      this.messages = response
    }})
  }

  delete(id: number): void {
    this.messageService.deleteMessage(id).subscribe({next: () => {
      this.messages?.splice(this.messages.findIndex(m => m.id === id), 1);
    }})
  }
}
