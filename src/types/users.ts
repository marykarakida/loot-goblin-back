import { User } from '@prisma/client';

type LoginData = Pick<User, 'email' | 'password'>;

interface CreateUserData {
    email: string;
    username: string;
    password: string;
    picture: string;
}

interface RegisterData extends CreateUserData {
    passwordConfirmation: string;
}

export { User, CreateUserData, LoginData, RegisterData };
