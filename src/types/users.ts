import { User } from '@prisma/client';

type UserDetail = Omit<User, 'id'>;

type LoginData = Pick<User, 'email' | 'password'>;

interface RegisterData extends UserDetail {
    passwordConfirmation: string;
}

export { User, UserDetail, RegisterData, LoginData };
