import { TokenService } from "../../token/service/token.service";
import { UserService } from "../../user/service/user.service";
import { BadRequestException, NotFoundException } from "../../utils/error/notFound.error";
import { AuthDto } from "../dto/auth.dto";

export class AuthService {

    constructor(private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) { }

    async signIn(authDto: AuthDto) {
        const user = await this.userService.findUserByEmail(authDto.email ?? "");
        if (!user) throw new BadRequestException("Invalid username or password");

        //compare password
        const isValid = await this.userService.comparePassword(user.password, authDto.password);
        if (!isValid) throw new BadRequestException("Invalid username or password");

        //generate token 
        const authToken = this.tokenService.generateAuthToken({
            email: user.email,
            userId: String(user._id),// as unknown as string,
            name: user.name
        })

        const refreshToken = this.tokenService.generateRefreshToken({
            email: user.email,
            userId: String(user._id),// as unknown as string,
            name: user.name
        })
      
        return {
            user,
            authToken,
            refreshToken
        }
    }

}