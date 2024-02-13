import { CreateUserDto, updateUserProfile } from "../Dto/user.dto";
import { UserService } from "../service/user.service";
import { NextFunction, Request, Router, Response } from "express";


export class UserController {
    private readonly userService = new UserService();


    createUser = () => async (
        req: Request<{}, {}, CreateUserDto>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await this.userService.createUser(req.body);
            res.send({
                "message":"user created successfully",
                 email:user.email,
                 name:user.name
            });
        } catch (error: any) {
            next(error);
        }
    }

    updateUserProfile= ()=>async (
        req: Request<{}, {}, updateUserProfile>,
        res: Response,
        next: NextFunction
    )=>{
     try {
        const tokenData = res.locals.tokenData;
        const updatedUser = await this.userService.updateUserProfile(req.body,tokenData);
        res.send({
            message: "user profile updated successfully",
            user: {
             ...updatedUser
            }
        });
     } catch (error) {
        next(error);
     }
    }
}