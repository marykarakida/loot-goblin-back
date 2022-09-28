import { User } from '@prisma/client';

type UserDetail = Omit<User, 'id'>;

interface CreateUserData extends UserDetail {
    passwordConfirmation: string;
}

export { User, UserDetail, CreateUserData };
