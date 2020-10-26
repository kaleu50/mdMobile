export interface PostCreate {
  title: string;
  text: string;
  userId: string;
  imageBase64: string;
}

export interface Post {
  _id: string;
  title: string;
  text: string;
  userId: string;
  refpostpic: string;
  likes: number;
  createdAt: Date;
}
