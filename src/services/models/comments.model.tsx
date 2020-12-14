import { User } from "./user.model";

export interface Comments {
  _id: string
  text: string,
  userId: User,
  post: string,
  createdAt: Date
}


export interface CommentCreate {
  text: string,
  post: string
}