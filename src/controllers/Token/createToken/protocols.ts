/* eslint-disable @typescript-eslint/no-explicit-any */

export interface CreateTokenParams{
    email:string;
    password:string;
}

export interface ICreateToken{
    create(params:CreateTokenParams):Promise<any>
}
