import supertest from 'supertest';
import { faker } from '@faker-js/faker';

import app from '../../../src/app';
import prisma from '../../../src/database';

import { deleteAllData, disconnectPrisma } from '../../factories/scenarioFactory';
import { createScenarioOneUserWithOneSession, createScenarioOneUserWithOneExpiredSession } from '../../factories/scenarioFactory';
import sessionFactory from '../../factories/sessionFactory';

import { signJwt } from '../../../src/utlis/jwtUtils';

const server = supertest(app);

describe('POST /users/token/refresh', () => {
    beforeEach(async () => {
        await deleteAllData();
    });

    afterAll(async () => {
        await disconnectPrisma();
    });

    describe('given that refresh token is valid and has not expired', () => {
        it('should return status code 200, a new access and refresh token and update new session', async () => {
            const {
                session: { refreshToken: currentRefreshToken },
            } = await createScenarioOneUserWithOneSession();

            const result = await server.post('/users/token/refresh').send({ refreshToken: currentRefreshToken });

            const oldSession = await prisma.session.findUnique({ where: { refreshToken: currentRefreshToken } });
            const newSession = await prisma.session.findUnique({ where: { refreshToken: result.body.refreshToken } });

            expect(result.status).toBe(200);
            expect(oldSession).toBeNull();
            expect(newSession).not.toBeNull();
        });
    });

    describe('given that refresh token is valid and has not expired, but cannot be found in sessions table', () => {
        it("should return status code 403 and delete all corresponding user's sessions", async () => {
            const { user } = await createScenarioOneUserWithOneSession();

            // create another user session, to check if all user's session is deleted
            await sessionFactory(user.id);

            const validRefreshTokenButNoCorrespondingSession = signJwt({ id: user.id }, process.env.REFRESH_TOKEN_SECRET as string);

            const result = await server.post('/users/token/refresh').send({ refreshToken: validRefreshTokenButNoCorrespondingSession });

            const oldSession = await prisma.session.findMany({ where: { userId: user.id } });

            expect(result.status).toBe(403);
            expect(oldSession).toHaveLength(0);
        });
    });

    describe('given that refresh token has expired', () => {
        it("should return status code 403 and delete all corresponding user's sessions", async () => {
            const {
                session: { refreshToken: expiredRefreshToken },
            } = await createScenarioOneUserWithOneExpiredSession();

            const result = await server.post('/users/token/refresh').send({ refreshToken: expiredRefreshToken });

            const oldSession = await prisma.session.findUnique({ where: { refreshToken: expiredRefreshToken } });

            expect(result.status).toBe(403);
            expect(oldSession).toBeNull();
        });
    });
});
