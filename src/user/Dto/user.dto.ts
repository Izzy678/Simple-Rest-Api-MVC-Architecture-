import { User } from "../model/user.model";

export class CreateUserDto {
    name?: string
    password?: string
    email?: string
    confirmPassword?: string
}