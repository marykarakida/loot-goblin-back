import { createUserService } from './createUserService';

import { UserDetail } from '../../types/users';

interface IUserService {
    createUser(userData: UserDetail): Promise<void>;
}

const userService: IUserService = { createUser: createUserService };

export default userService;
