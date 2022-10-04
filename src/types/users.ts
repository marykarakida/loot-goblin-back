import { User } from '@prisma/client';

type UserData = Omit<User, 'id'>;
type LoginData = Pick<User, 'email' | 'password'>;

interface CreateUserData extends UserData {}

export { User, UserData, LoginData, CreateUserData };
