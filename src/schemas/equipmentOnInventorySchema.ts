import Joi from 'joi';

export const createEquipmentOnInventorySchema = Joi.object({
    equipmentId: Joi.string().required(),
    inventoryId: Joi.string().required(),
    quantity: Joi.number().strict().required(),
});
