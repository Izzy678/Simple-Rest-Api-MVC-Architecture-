import mongoose from "mongoose";
import { User, userSchema, userModel } from "../model/user.model";
import { CreateUserDto } from "../Dto/user.dto";
import bcrypt from 'bcrypt'
import { throwConflictException } from "../../utils/customerror";
import { ConflictException, NotFoundException } from "../../utils/error/notFound.error";

export class UserService {

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const userExist = await userModel.findOne({
      $or: [
        { email: createUserDto.email },
        { name: createUserDto.name }
      ]
    });
    if (userExist) { 
      throw new ConflictException("name or email already exist");
    }
    createUserDto.password = await this.hashUserPassword(createUserDto.password ?? "" );
    const user = await userModel.create(createUserDto);
    return user;
  }
  async findUserByEmail(email:string){
   const user = await userModel.findOne({email});
    return user;
  }
  async hashUserPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async comparePassword(hashedPassword: string, rawPassword: string): Promise<Boolean> {
    const isValid = await bcrypt.compare(rawPassword, hashedPassword);
    return isValid;
  }



}   
