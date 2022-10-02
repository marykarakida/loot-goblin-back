import Joi from 'joi';

export const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string().required(),
});
