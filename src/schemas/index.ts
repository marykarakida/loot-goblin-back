import * as userSchema from './userSchema';

const SCHEMAS = { ...userSchema };

type SchemasTypes = keyof typeof SCHEMAS;

export { SCHEMAS, SchemasTypes };
