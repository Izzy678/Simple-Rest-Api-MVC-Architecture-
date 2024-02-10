import { HttpError } from "../../utils/error/http.error";
import { CreateUserDto } from "../Dto/user.dto";
import { UserService } from "../service/user.service";
import { NextFunction, Request, Router, Response } from "express";


export class UserController {
    private userService: UserService
    router: Router

    constructor(userService: UserService) {
        this.router = Router()
        this.userService = userService;
        this.createUser();
    }

    async createUser() {
        this.router.post('/api/users/create-user',
         (async (req: Request<{}, {}, CreateUserDto, {}>, res: Response, next: NextFunction) => {
            try {
                const user = await this.userService.createUser(req.body);
                console.log("user,", user)
                res.send({
                    user,
                    status: "ok",
                    message: "user created successfully",

                }).status(200);
            } catch (error:any) {
                next(error);
            }
        }))
    }

}