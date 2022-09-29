import jwt, { SignOptions } from 'jsonwebtoken';

import { TokenPayloadData } from '../types/tokens';

export function signJwt(payload: TokenPayloadData, secretKey: string, options?: SignOptions | undefined) {
    return jwt.sign(payload, secretKey, options);
}
