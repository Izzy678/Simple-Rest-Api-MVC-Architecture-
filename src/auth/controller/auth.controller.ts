
import { AuthService } from "../service/auth.service";
import { NextFunction, Request, Router, Response } from "express";
import { AuthDto } from "../dto/auth.dto";
import { joiValidateMiddleware } from "../../middleware/validateResource";
import { signInValidator } from "../validator/auth.validator";

export class AuthController {
    private authService: AuthService
    router: Router;
    static basePath = '/api/auth'


    constructor(authService: AuthService) {
        this.authService = authService,
            this.router = Router();
        this.signIn();
    }

    signIn() {
        this.router.get('/signIn',joiValidateMiddleware(signInValidator), async (req: Request<{}, {}, AuthDto, {}>, res: Response, next: NextFunction) => {
            try {
                const user = await this.authService.signIn(req.body);
                res.status(200).send({
                    message: "login successfully",
                    user
                })
            } catch (error) {
                next(error);
            }
        }
        )
    }



}