import { LoginRequest } from './models/login.model';
import api from "./api.service";


interface User{
    token: string,
    user:{
        name: string;
        email: string;
    }
}

export function signIn (loginData: LoginRequest): Promise<User> {
    return api.post('/login', {loginData})
}