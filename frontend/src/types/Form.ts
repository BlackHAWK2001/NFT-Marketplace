export interface IFormRegister {
    id: any;
    token?: string;
    username: string;
    email: string;
    password: string;
    wallet: {
        walletId: string;
    };
}

export interface IFormLogin{
    id:string;
    token?: string;
    email: string;
    password: string;
    username?:string
}

export type FormData={
    username: string;
    email: string;
    password: string;
}

