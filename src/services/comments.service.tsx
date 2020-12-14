import api from './api.service';
import {CommentCreate, Comments} from './models/comments.model';


export function getPostCommentsById(id: string): Promise<Comments[]> {
  return api.get(`/comments/${id}`).then((res) => {
    return res.data;
  });
}

export function createComment(data: CommentCreate): Promise<any> {
  return api.post('/comments', data).then((res) => {
    return res.data;
  });
}