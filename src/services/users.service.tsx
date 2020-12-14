import {SignUpRequest} from './models/signup.model';
import api from './api.service';
import {User} from './models/user.model';
import {AxiosRequestConfig} from 'axios';

export function signUp(data: SignUpRequest): Promise<any> {
  return api.post('/users', data).then((res) => {
    return res.data;
  });
}

export function update(data: SignUpRequest): Promise<any> {
  return api.post('/users/updateuser', data).then((res) => {
    return res.data;
  });
}

export function uploadImageProfile(data: any): Promise<any> {
  return api.post('/users/profilepic', data).then((res) => {
    return res.data;
  });
}

export function getUserById(userId: string): Promise<User> {
  return api.get(`/users/userById/${userId}`).then((res) => {
    return res.data;
  });
}
export function followById(id: string): Promise<any> {
  return api.post(`/users/follow/${id}`).then((res) => {
    return res.data;
  });
}

export function unFollowById(id: string): Promise<any> {
  return api.post(`/users/unfollow/${id}`).then((res) => {
    return res.data;
  });
}

export function getUsersByName(data: any){
  const config = {
    params: data,
  } as AxiosRequestConfig;

  return api.get('/users/searchusers', config).then((res) => {
    return res.data;
  });
}

export function getRecomendations(): Promise<User[]> {
  return api.get(`/users/recomendations`).then((res) => {
    return res.data;
  });
}
