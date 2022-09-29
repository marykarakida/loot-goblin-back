import prisma from '../../src/database';
import { hashPassword } from '../../src/utlis/cryptUtils';
import { UserDetail } from '../../src/types/users';

export default async function userFactory(user: UserDetail) {
    return prisma.user.create({
        data: {
            ...user,
            password: hashPassword(user.password),
        },
    });
}
