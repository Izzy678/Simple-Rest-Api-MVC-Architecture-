import { TokenDto } from "../token/token.dto.ts/token.dto";
import { Request, Response, NextFunction } from 'express'
import { TokenService } from "../token/service/token.service";
import { unknown } from "zod";


export async function deserializeToken(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers['authorization'];

    const refreshToken = req.headers['refresh-token'];

    try {
        if (!accessToken) return next();

        const decodedToken = new TokenService().verifyAuthToken(String(accessToken));

        //store  decoded token in the res object
        res.locals.tokenData = decodedToken;
        next();

    }
    catch (error: any) {

        /* 
        this logic will generate new access token if the refresh token is defined and jwt is expired
        */

        if (error.message === "jwt expired" && refreshToken) {

            try {
                const newAcessToken = await new TokenService().reIssueAccessToken(String(refreshToken), req.body);

                if (newAcessToken) {
                    //set authorization header
                    res.setHeader('Authorization', newAcessToken);

                    //verify new access Token
                    const tokenData = new TokenService().verifyAuthToken(newAcessToken);

                    //store tokenData locally
                    res.locals.tokenData = tokenData;

                    return next();
                }
            }
            catch (error) {

                next(error);
            }

        }

        next(error);
    }



}