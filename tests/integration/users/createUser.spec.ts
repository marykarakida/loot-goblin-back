import supertest from 'supertest';
import { faker } from '@faker-js/faker';

import app from '../../../src/app';
import prisma from '../../../src/database';

import { deleteAllData, disconnectPrisma } from '../../factories/scenarioFactory';
import userFactory from '../../factories/userFactory';

const server = supertest(app);

describe('POST /users', () => {
    beforeEach(async () => {
        await deleteAllData();
    });

    afterAll(async () => {
        await disconnectPrisma();
    });

    describe('given that register data is valid', () => {
        it('should return status code 201 and create a new account', async () => {
            const validUserData = {
                email: faker.internet.email(),
                username: faker.internet.userName(),
                picture: faker.internet.avatar(),
                password: faker.internet.password(),
            };

            const result = await server.post('/users').send({ ...validUserData, passwordConfirmation: validUserData.password });
            const createdUser = await prisma.user.findUnique({ where: { email: validUserData.email } });

            expect(result.status).toBe(201);
            expect(createdUser).not.toBeNull();
        });
    });

    describe('given that register data is empty', () => {
        it('should return status code 422', async () => {
            const invalidUserData = {};

            const result = await server.post('/users').send(invalidUserData);

            expect(result.status).toBe(422);
        });
    });

    describe('given that email is already linked to an account', () => {
        it('should return status code 409', async () => {
            const validUserData = {
                email: faker.internet.email(),
                username: faker.internet.userName(),
                picture: faker.internet.avatar(),
                password: faker.internet.password(),
            };

            await userFactory(validUserData);

            const invalidUserDataWithSameEmailDifferentUsername = {
                ...validUserData,
                username: faker.internet.userName(),
            };

            const result = await server.post('/users').send({
                ...invalidUserDataWithSameEmailDifferentUsername,
                passwordConfirmation: invalidUserDataWithSameEmailDifferentUsername.password,
            });

            expect(result.status).toBe(409);
        });
    });

    describe('given that email is already linked to an account', () => {
        it('should return status code 409', async () => {
            const validUserData = {
                email: faker.internet.email(),
                username: faker.internet.userName(),
                picture: faker.internet.avatar(),
                password: faker.internet.password(),
            };

            await userFactory(validUserData);

            const invalidUserDataWithSameUsernameDifferentEmail = {
                ...validUserData,
                email: faker.internet.email(),
            };

            const result = await server.post('/users').send({
                ...invalidUserDataWithSameUsernameDifferentEmail,
                passwordConfirmation: invalidUserDataWithSameUsernameDifferentEmail.password,
            });

            expect(result.status).toBe(409);
        });
    });
});
