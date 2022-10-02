import supertest from 'supertest';
import { faker } from '@faker-js/faker';

import app from '../../../src/app';
import prisma from '../../../src/database';

import { deleteAllData, disconnectPrisma } from '../../factories/scenarioFactory';
import userFactory from '../../factories/userFactory';

const server = supertest(app);

describe('POST /auth', () => {
    const registerData = {
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

    describe('given that register data is valid', () => {
        it('should return status code 201 and create a new account', async () => {
            const result = await server.post('/auth').send(registerData);
            const createdUser = await prisma.user.findUnique({ where: { email: registerData.email } });

            expect(result.status).toBe(201);
            expect(createdUser).not.toBeNull();
        });
    });

    describe('given that register data is empty', () => {
        it('should return status code 422', async () => {
            const invalidRegisterData = {};

            const result = await server.post('/auth').send(invalidRegisterData);

            expect(result.status).toBe(422);
        });
    });

    describe('given that email is already linked to an account and/or username is already taken', () => {
        it('should return status code 409', async () => {
            await userFactory(registerData);

            const result = await server.post('/auth').send(registerData);

            expect(result.status).toBe(409);
        });
    });
});
