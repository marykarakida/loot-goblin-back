import supertest from 'supertest';
import { faker } from '@faker-js/faker';

import app from '../../../src/app';
import prisma from '../../../src/database';

import { createScenarioOneUserWithOneSession, deleteAllData, disconnectPrisma } from '../../factories/scenarioFactory';

const server = supertest(app);

describe('POST /users/login', () => {
    beforeEach(async () => {
        await deleteAllData();
    });

    afterAll(async () => {
        await disconnectPrisma();
    });

    describe('given that login data is valid', () => {
        it('should return status code 200, an access and refresh token and create new session', async () => {
            const { loginData } = await createScenarioOneUserWithOneSession();

            const result = await server.post('/users/login').send(loginData);

            const createdSession = await prisma.session.findUnique({ where: { refreshToken: result.body.refreshToken } });

            expect(result.status).toBe(200);
            expect(createdSession).not.toBeNull();
        });
    });

    describe('given that login data is valid and user already has one or more active sessions', () => {
        it('should return status code 200, an access and refresh token and allow to create multiple session', async () => {
            const { user, loginData } = await createScenarioOneUserWithOneSession();

            const result = await server.post('/users/login').send(loginData);

            const createdSession = await prisma.session.findMany({ where: { userId: user.id } });

            expect(result.status).toBe(200);
            expect(createdSession.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe('given that no account is linked to the email sent in login data', () => {
        it('should return status code 401 and not create a new session', async () => {
            const invalidloginData = { email: faker.internet.email(), password: faker.internet.password() };
            const result = await server.post('/users/login').send(invalidloginData);

            expect(result.status).toBe(401);
        });
    });

    describe('given that wrong password to an existing account was sent in login data', () => {
        it('should return status code 401 and not create a new session', async () => {
            const { loginData } = await createScenarioOneUserWithOneSession();

            const loginDataWithWrongPwd = { ...loginData, password: faker.internet.password() };

            const result = await server.post('/users/login').send(loginDataWithWrongPwd);

            expect(result.status).toBe(401);
        });
    });
});
