import supertest from 'supertest';
import { faker } from '@faker-js/faker';

import app from '../../../src/app';
import prisma from '../../../src/database';

import { createScenarioOneUserWithOneSession, deleteAllData, disconnectPrisma } from '../../factories/scenarioFactory';
import userFactory from '../../factories/userFactory';

import { signJwt } from '../../../src/utlis/jwtUtils';

const server = supertest(app);

describe('POST /users/token/refresh', () => {
    const createUserData = {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        picture: faker.internet.avatar(),
        password: faker.internet.password(),
    };

    beforeEach(async () => {
        await deleteAllData();
    });

    afterAll(async () => {
        await disconnectPrisma();
    });

    describe('given that user has an active session', () => {
        it("should return status code 204 and delete user's session from database", async () => {
            const {
                user,
                session: { refreshToken: currentRefreshToken },
            } = await createScenarioOneUserWithOneSession();

            const accessToken = signJwt({ id: user.id }, process.env.ACCESS_TOKEN_SECRET as string);

            const result = await server
                .post('/users/logout')
                .send({ refreshToken: currentRefreshToken })
                .set('Authorization', `Bearer ${accessToken}`);

            const oldSession = await prisma.session.findUnique({ where: { refreshToken: currentRefreshToken } });

            expect(result.status).toBe(204);
            expect(oldSession).toBeNull();
        });
    });

    describe('given that authorization headers does not send authorization headers', () => {
        it('should return status code 401', async () => {
            const user = await userFactory(createUserData);

            const refreshToken = signJwt({ id: user.id }, process.env.REFRESH_TOKEN_SECRET as string);

            const result = await server.post('/users/logout').send({ refreshToken });

            expect(result.status).toBe(401);
        });
    });

    describe('given that user exists but has an expired access token', () => {
        it('should return status code 401 ', async () => {
            const {
                user,
                session: { refreshToken: currentRefreshToken },
            } = await createScenarioOneUserWithOneSession();

            const accessToken = signJwt({ id: user.id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: 0 });

            const result = await server
                .post('/users/logout')
                .send({ refreshToken: currentRefreshToken })
                .set('Authorization', `Bearer ${accessToken}`);

            expect(result.status).toBe(401);
        });
    });

    describe('given that user exists but has no active sessions', () => {
        it('should return status code 401', async () => {
            const user = await userFactory(createUserData);

            const refreshToken = signJwt({ id: user.id }, process.env.REFRESH_TOKEN_SECRET as string);
            const accessToken = signJwt({ id: user.id }, process.env.ACCESS_TOKEN_SECRET as string);

            const result = await server.post('/users/logout').send({ refreshToken }).set('Authorization', `Bearer ${accessToken}`);

            expect(result.status).toBe(401);
        });
    });
});
