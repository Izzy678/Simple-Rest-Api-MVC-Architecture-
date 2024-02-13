import joi from 'joi'

export const createUserValidator = joi.object({
    name: joi.string().required(),
    password: joi.string().min(7).required(),
    email: joi.string().email().required(),
    passwordConfirmation: joi.string().required().valid(joi.ref('password'))
}).messages({
    'any.only': 'Passwords do not match',
});


export const updateUserValidator = joi.object({
    name: joi.string(),
    email: joi.string().email()
});