/* eslint-disable @typescript-eslint/no-explicit-any */

export interface CreateImageParams{
    filename:string;
    originalname:string;
}

export interface ICreateImage{
    create(params:CreateImageParams):Promise<any>
}
