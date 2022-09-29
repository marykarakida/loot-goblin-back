import { createUserService } from './createUserService';

import { CreateUserData } from '../../types/users';

interface IUserService {
    createUser(userData: CreateUserData): Promise<void>;
}

const userService: IUserService = { createUser: createUserService };

export default userService;
