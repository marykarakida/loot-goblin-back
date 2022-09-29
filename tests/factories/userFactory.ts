import prisma from '../../src/database';
import { hashPassword } from '../../src/utlis/cryptUtils';
import { CreateUserData } from '../../src/types/users';

export default async function userFactory(user: CreateUserData) {
    return prisma.user.create({
        data: {
            ...user,
            password: hashPassword(user.password),
        },
    });
}
