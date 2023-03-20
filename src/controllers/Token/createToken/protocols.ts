
export interface CreateTokenParams{
    email:string;
    password:string;
}

export interface ICreateToken{
    create(params:CreateTokenParams):Promise<any>
}
