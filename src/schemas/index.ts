import * as userSchema from './userSchema';
import * as sessionSchema from './sessionSchema';

const SCHEMAS = { ...userSchema, ...sessionSchema };

type SchemasTypes = keyof typeof SCHEMAS;

export { SCHEMAS, SchemasTypes };
