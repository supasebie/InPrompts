import { User } from './user';

export class UserParams {
  gender: string;
  minAge = 18;
  maxAge = 99;
  pageNumber = 1;
  pageSize = 5;
  orderBy = 'lastActive';
  predicate = 'likedBy'
  container = "inbox"

  constructor(user: User) {
    this.gender = user.gender == 'female' ? 'male' : 'female';
  }
}
