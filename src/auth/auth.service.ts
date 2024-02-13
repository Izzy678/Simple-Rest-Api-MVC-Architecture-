import { TokenService } from "../token/token.service";
import { UserService } from "../user/user.service";
import { BadRequestException, NotFoundException } from "../utils/error/httpException.error";
import { AuthDto } from "./auth.dto";

export class AuthService {
   private readonly userService = new UserService();
   private readonly tokenService = new TokenService();
   
    async signIn(authDto: AuthDto) {

        const user = await this.userService.findUserByEmail(authDto.email);
        if (!user) throw new BadRequestException("Invalid email or password");

        //compare password
        const isValid = await this.userService.comparePassword(user.password, authDto.password);
        if (!isValid) throw new BadRequestException("Invalid username or password");

        //generate token 
        const authToken = this.tokenService.generateAuthToken({
            email: user.email,
            user: user._id as unknown as string,
            name: user.name
        })

        const refreshToken = this.tokenService.generateRefreshToken({
            email: user.email,
            user: user._id as unknown as string,
            name: user.name
        });
      
        return {
            user:{
            userId:user._id,
            name:user.name,
            email:user.email
            },
            authToken,
            refreshToken
        }
    }

}