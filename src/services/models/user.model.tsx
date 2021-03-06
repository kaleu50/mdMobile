export interface User {
    _id: string;
    id: string;
    name: string;
    email: string;
    birthdate: Date;
    condition: string;
    refprofilepic: string;
    posts: any;
    follow: [string];
    followedby: [string];
    alreadyFollow: boolean
}