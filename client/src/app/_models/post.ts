import { User } from "./user";

export interface Post {
    id: number,
    appUser: User,
    prompt: string,
    imgUrl: string,
    comments: Comment[],
    createdDate: Date
}