import api from './api.service';
import { CreateLike } from './models/likes.model';


export function createLike(id:string, data: CreateLike): Promise<any> {
  return api.post(`/likes/${id}`, data).then((res) => {
    return res.data;
  });
}