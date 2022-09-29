import { faker } from '@faker-js/faker';

import prisma from '../../src/database';

import sessionFactory from './sessionFactory';
import userFactory from './userFactory';

export async function deleteAllData() {
    await prisma.$transaction([prisma.$executeRaw`TRUNCATE TABLE users CASCADE`, prisma.$executeRaw`TRUNCATE TABLE sessions`]);
}

export async function disconnectPrisma() {
    await prisma.$disconnect();
}

export async function createScenarioOneUserWithOneSession() {
    const createUserData = {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        picture: faker.internet.avatar(),
        password: faker.internet.password(),
    };

    const loginData = { email: createUserData.email, password: createUserData.password };

    const user = await userFactory(createUserData);

    const session = await sessionFactory(user.id);

    return { user, session, loginData };
}

export async function createScenarioOneUserWithOneExpiredSession() {
    const createUserData = {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        picture: faker.internet.avatar(),
        password: faker.internet.password(),
    };

    const loginData = { email: createUserData.email, password: createUserData.password };

    const user = await userFactory(createUserData);

    const session = await sessionFactory(user.id, { expiresIn: 0 });

    return { user, session, loginData };
}
