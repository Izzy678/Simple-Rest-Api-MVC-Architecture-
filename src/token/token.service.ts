import { TokenDto } from "../token.dto.ts/token.dto";
import jwt, { Jwt } from "jsonwebtoken";
import { env } from "../../config/config";
import { User } from "../../user/model/user.model";
import { UserService } from "../../user/service/user.service";
import { BadRequestException, NotFoundException, UnAuthorizedException } from "../../utils/error/httpException.error";
export class TokenService {
    private readonly JWT_TTL = env.JWT_TTL;
    private readonly REFRESH_TOKEN_TTL = env.REFRESH_TOKEN_TTL
    private readonly SECRET_KEY = env.SECRET_KEY as unknown as string

    

    generateAuthToken(tokenDto: TokenDto) {
        const authToken = jwt.sign(tokenDto,this.SECRET_KEY,{
            expiresIn:this.JWT_TTL
        });
        return authToken;
    }

    generateRefreshToken(tokenDto: TokenDto) {
        const refreshToken = jwt.sign({
        user:tokenDto.user
        },this.SECRET_KEY,{
            expiresIn:this.REFRESH_TOKEN_TTL
        });
        return refreshToken;
    }

    verifyAuthToken(token:string){
        const tokenData = jwt.verify(token,this.SECRET_KEY);
        return tokenData;
    }

    verifyRefreshToken(refreshToken:string){
        try{
            const tokenData = jwt.verify(refreshToken,this.SECRET_KEY);
            return tokenData;
        }
        catch(error:any){
          if(error.message === "jwt expired"){
            throw new BadRequestException("refresh token expired..kindly login again");
          }
        }
        
    }

    async reIssueAccessToken(refreshToken:string, {email,password}:{email:string,password:string}){
        const user = await new UserService().findUserByEmail(email);
        if(!user) throw new NotFoundException("user does no exist");

        const tokenDto:TokenDto = {
            user:user._id as unknown as string,
            name:user.name,
            email:user.email
        }
        const refreshTokenData = this.verifyRefreshToken(refreshToken);
        if(refreshTokenData){
            const newAcessToken = this.generateAuthToken(tokenDto);
            return newAcessToken;
        }
    }


}