import api from './api.service';
import { Comments } from './models/comments.model';
import {Post, PostCreate} from './models/posts.model';

export function createPost(data: PostCreate): Promise<any> {
  return api.post('/posts', data).then((res) => {
    return res.data;
  });
}

export function getPostFeed(): Promise<Post[]> {
  return api.get('/posts/feed').then((res) => {
    return res.data;
  });
}

export function getPostsById(id: string): Promise<Post[]> {
  return api.get(`/posts/getallbyid/${id}`).then((res) => {
    return res.data;
  });
}

export function getPostById(id: string): Promise<Post> {
  return api.get(`/posts/${id}`).then((res) => {
    return res.data;
  });
}

export function getPostCommentsById(id: string): Promise<Comments[]> {
  return api.get(`/posts/comment/${id}`).then((res) => {
    return res.data;
  });
}
