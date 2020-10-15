import { Users } from '../interfaces/users.interface';

export class User implements Users{
    constructor(
        public id:number,
        public name:string,
        public username:string,
        public email:string,
        public password:string,
        public entitlements:Array<string>,
        public createdAt:Date,
        public updatedAt:Date
    ){}
}