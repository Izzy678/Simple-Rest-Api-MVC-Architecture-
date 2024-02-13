import mongoose from "mongoose";
import { env } from '../config/config';


export function connect() {
    mongoose.connect(env.CONNECTION_STRING).then(() => {
        console.log("connected to db sucessfully");
    }).catch((error: Error) => {
        throw new Error(error.message);
    })
}