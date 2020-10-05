import { Users } from '../interfaces/users.interface';
import { UserPost } from '../interfaces/userShort.interface';

export class UserP implements UserPost{
    constructor(
        public name:string,
        public username:string,
        public email:string,
        public password:string,
        public roles:Array<any>,
    ){}
}