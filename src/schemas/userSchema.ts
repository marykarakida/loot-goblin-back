import Joi from 'joi';

export const createUserSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    username: Joi.string().trim().required(),
    password: Joi.string().trim().min(8).max(24).required(),
    passwordConfirmation: Joi.string().required().valid(Joi.ref('password')).messages({
        'any.only': "'passwordConfirmation' has to match 'password'",
    }),
    picture: Joi.string().trim().uri().required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().required(),
});
