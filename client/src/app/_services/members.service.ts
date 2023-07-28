import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { User } from '../_models/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCach = new Map();
  userParams: UserParams | undefined;
  user: User | undefined;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(takeUntilDestroyed()).subscribe({
      next: (user) => {
        if (user) {
          this.userParams = new UserParams(user);
          this.user = user;
        }
      },
    });
  }

  getMembers(userParams: UserParams) {
    const response = this.memberCach.get(Object.values(userParams).join('-'));

    if (response)
    {
      return of(response);
    }

    let params = getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return getPaginatedResult<Member[]>(this.baseUrl + 'users', params, this.http).pipe(map(
      response => {
        this.memberCach.set(Object.values(userParams).join('-'), response);
        return response;
      }
    ))
  }

  getMember(username: string) {
    const member = [...this.memberCach.values()]
    .reduce((arr, elem) => arr.concat(elem.result), [])
    .find((member:Member) => member.userName === username);

    if (member) {
      return of(member);
    }

    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = {
          ...this.members[index],
          ...member,
        };
      })
    );
  }

  ///////////////////////////////////////////////////////////////////////////////////////////
  // PHOTO METHODS
  ///////////////////////////////////////////////////////////////////////////////////////////
  setMain(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////
  // LIKE METHODS
  ///////////////////////////////////////////////////////////////////////////////////////////
  addLike(username: string) {
    return this.http.post(this.baseUrl + 'likes/' + username, {})
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResult<Member[]>(this.baseUrl+ 'likes', params, this.http);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////
  // PARAM METHODS
  ///////////////////////////////////////////////////////////////////////////////////////////
  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams){
    this.userParams = params;
  }

  resetUserParams() {
    if(this.user){
      this.userParams = new UserParams(this.user);
      return this.userParams;
    }
    return;
  }

  getHttpOptionsPagination() {
    return {
      headers: new HttpHeaders({}),
    };
  }
  
}
