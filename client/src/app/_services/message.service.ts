import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message } from '../_models/message';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMessagesForUser(pageNumber: number, pageSize: number, container: string) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);

    return getPaginatedResult<Message[]>(
      environment.apiUrl + 'messages',
      params,
      this.http
    );
  }

  createMessage(username: string, content: string) {
    return this.http.post<Message>(this.baseUrl + 'messages', {recipientUsername: username, content});
  }

  getMessageThread(recipient: string) {
    return this.http.get<Message[]>(this.baseUrl + 'messages/thread/' + recipient);
  }

  deleteMessage(id: number) {
    return this.http.delete(this.baseUrl + 'messages/' + id);
  }
}
