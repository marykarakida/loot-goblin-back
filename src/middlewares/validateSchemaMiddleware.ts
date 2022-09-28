import { NextFunction, Request, Response } from 'express';

import { wrongSchemaError } from '../utlis/errorUtils';
import { SCHEMAS, SchemasTypes } from '../schemas';

export function validateSchema(schema: SchemasTypes): (req: Request, res: Response, next: NextFunction) => void {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = SCHEMAS[schema].validate(req.body, { abortEarly: false });

        if (error) {
            const errorMessages = error.details.map(({ message }: { message: string }) => message);
            throw wrongSchemaError(errorMessages);
        }

        next();
    };
}
