export interface User {
    name: string;
    email: string;
    birthdate: Date;
    condition: string;
    posts: any;
    follow: [string];
    followedby: [string];
}