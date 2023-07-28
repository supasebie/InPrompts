import { Post } from "./post";
import { User } from "./user";

export interface Comment {
    id: number,
    postId: number,
    user: User,
    post: Post,
    content: string,
    createdDate: Date
}