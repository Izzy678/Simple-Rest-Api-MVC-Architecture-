import { User, userSchema, userModel } from "../model/user.model";
import { CreateUserDto, updateUserProfile } from "../Dto/user.dto";
import bcrypt from 'bcrypt';
import { ConflictException, NotFoundException } from "../../utils/error/httpException.error";
import { TokenDto } from "../../token/token.dto.ts/token.dto";

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
    createUserDto.password = await this.hashUserPassword(createUserDto.password);
    const user = await userModel.create(createUserDto)
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await userModel.findOne({ email });
    return user;
  }

  async updateUserProfile(updateUserProfileDto:updateUserProfile,tokenData:TokenDto){
   const updatedUser = await userModel.findByIdAndUpdate(tokenData.user,updateUserProfileDto,{new:true});
   if(!updatedUser) throw new NotFoundException("user does not exist");
   return updatedUser;
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
