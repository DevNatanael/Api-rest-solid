/* eslint-disable @typescript-eslint/no-explicit-any */

export interface CreateImageParams{
    imageName:string;
    path:string;
}

export interface ICreateImage{
    create(params:CreateImageParams):Promise<any>
}
