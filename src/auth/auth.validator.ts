import joi from 'joi';

export const signInValidator = joi.object({
    password: joi.string().min(7).required(),
    email: joi.string().email().required(),
})