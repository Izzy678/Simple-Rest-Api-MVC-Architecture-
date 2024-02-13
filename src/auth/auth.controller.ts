
import { AuthService } from "./auth.service";
import { NextFunction, Request, Response } from "express";
import { AuthDto } from "./auth.dto";

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
