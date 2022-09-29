import { faker } from '@faker-js/faker';
import { SignOptions } from 'jsonwebtoken';

import prisma from '../../src/database';

import { signJwt } from '../../src/utlis/jwtUtils';
import { TokenPayloadData } from '../../src/types/tokens';

export default async function sessionFactory(userId: string, options?: SignOptions) {
    const payload: TokenPayloadData = { id: userId };
    const secretKey = faker.datatype.uuid();

    return prisma.session.create({
        data: {
            userId,
            refreshToken: signJwt(payload, secretKey, options),
        },
    });
}
