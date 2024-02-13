
import { AuthService } from "../service/auth.service";
import { NextFunction, Request, Router, Response } from "express";
import { AuthDto } from "../dto/auth.dto";
import { joiValidateMiddleware } from "../../middleware/validateResource";
import { signInValidator } from "../validator/auth.validator";

export class AuthController {
    private readonly authService = new AuthService();
    static AuthBaseBath = '/api/auth'

    signIn = () => async (
        req: Request<{}, {}, AuthDto>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await this.authService.signIn(req.body);
            res.send(
                //  message: "login successfully",
                          user  );
        } catch (error) {
            next(error);
        }
    }

}
