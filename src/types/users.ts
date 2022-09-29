import { User } from '@prisma/client';

type UserDetail = Omit<User, 'id'>;

type LoginData = Pick<User, 'email' | 'password'>;

interface CreateUserData extends UserDetail {
    passwordConfirmation: string;
}

export { User, UserDetail, CreateUserData, LoginData };
