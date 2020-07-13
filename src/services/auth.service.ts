import { LoginRequest } from './models/login.model';
import api from "./api.service";


interface reponseUser {
    token: string,
    user: {
        name: string;
        email: string;
    }
}

export function signIn(data: LoginRequest): Promise<any> {
    return api.post('/login', data).then((res) => {
        console.log(res.data);
        return res.data;
    })
}