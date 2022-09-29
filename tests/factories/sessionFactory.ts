import { faker } from '@faker-js/faker';
import { SignOptions } from 'jsonwebtoken';

import prisma from '../../src/database';

import { signJwt } from '../../src/utlis/jwtUtils';

import { CreateSessionData } from '../../src/types/sessions';

export default async function sessionFactory(userId: string, options?: SignOptions) {
    const createdSessionData: CreateSessionData = {
        userId,
        refreshToken: signJwt({ id: userId }, process.env.REFRESH_TOKEN_SECRET as string, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE as string,
            ...options,
        }),
    };

    return prisma.session.create({ data: createdSessionData });
}
