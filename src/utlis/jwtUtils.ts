import jwt, { SignOptions } from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

import { TokenPayloadData, DecodeTokenReturnData } from '../types/tokens';

export function signJwt(payload: TokenPayloadData, secretKey: string, options?: SignOptions): string {
    return jwt.sign({ ...payload, jti: uuid() }, secretKey, { ...options });
}

export function verifyJwt(token: string, secretKey: string): DecodeTokenReturnData {
    try {
        const payload = jwt.verify(token, secretKey) as TokenPayloadData;

        return { isTokenValid: true, isTokenExpired: false, payload };
    } catch (e: any) {
        return { isTokenValid: false, isTokenExpired: e.message === 'jwt expired', payload: null };
    }
}
