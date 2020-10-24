import api from './api.service';
import {PostCreate} from './models/posts.model';

export function createPost(data: PostCreate): Promise<any> {
  return api.post('/posts', data).then((res) => {
    return res.data;
  });
}
