import { LoginUser } from '../interfaces/login.interface';
import { Users } from '../interfaces/users.interface';

export class Login implements LoginUser{
    constructor(
        public email:string,
        public password:string,
    ){}
}