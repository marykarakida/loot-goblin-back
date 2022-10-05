import * as characterSchema from './characterSchema';
import * as equipmentOnInventorySchema from './equipmentOnInventorySchema';
import * as sessionSchema from './sessionSchema';
import * as userSchema from './userSchema';

const SCHEMAS = { ...characterSchema, ...equipmentOnInventorySchema, ...userSchema, ...sessionSchema };

type SchemasTypes = keyof typeof SCHEMAS;

export { SCHEMAS, SchemasTypes };
