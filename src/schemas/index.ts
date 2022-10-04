import * as characterSchema from './characterSchema';
import * as userSchema from './userSchema';
import * as sessionSchema from './sessionSchema';

const SCHEMAS = { ...characterSchema, ...userSchema, ...sessionSchema };

type SchemasTypes = keyof typeof SCHEMAS;

export { SCHEMAS, SchemasTypes };
