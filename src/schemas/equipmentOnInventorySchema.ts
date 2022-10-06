import Joi from 'joi';

export const createEquipmentOnInventorySchema = Joi.object({
    equipmentId: Joi.string().required(),
    quantity: Joi.number().strict().required(),
});

export const swapEquipmentPositionSchema = Joi.object({
    equipmentId: Joi.string().required(),
    initialPosition: Joi.number().min(0).strict().required(),
    finalPosition: Joi.number().min(0).strict().required(),
});
