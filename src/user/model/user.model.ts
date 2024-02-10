import mongoose from "mongoose"

export interface User{
    name: string
    password: string
    email: string
    userName: string
}

export const userSchema = new mongoose.Schema<User>({
    name: String,
    password: String,
    email: String,
    userName: String
},
    {
        timestamps: true
    }
);

export const userModel = mongoose.model('User', userSchema);


