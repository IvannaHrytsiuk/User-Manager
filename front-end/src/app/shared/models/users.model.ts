import { Users } from '../interfaces/users.interface';

export class User implements Users{
    constructor(
        public id:number,
        public name:string,
        public email:string,
        public password:string,
        public created_at:Date,
        public updated_at:Date
    ){}
}