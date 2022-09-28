import { createUser } from './createUser';

import { UserDetail } from '../../types/users';

interface IUserService {
    createUser(userData: UserDetail): Promise<void>;
}

const userService: IUserService = { createUser };

export default userService;
