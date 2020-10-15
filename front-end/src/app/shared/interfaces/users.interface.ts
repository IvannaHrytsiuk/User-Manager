export interface Users{
    id:number;
    name:string;
    username:string;
    email:string;
    password:string;
    entitlements:Array<string>;
    createdAt:Date;
    updatedAt:Date;
}