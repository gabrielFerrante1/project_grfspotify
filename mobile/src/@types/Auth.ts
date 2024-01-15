import { Api } from "./Api";

export type User = {
    id: number;
    email: string;
    name: string;
    token: string
}

export interface ApiSignIn extends Api {
    jwt: string;
    user: {
        id: number,
        name: string,
        email: string,
    }
}

export interface ApiUserInit extends Api {
    id: number;
    name: string;
    email: string;
}

