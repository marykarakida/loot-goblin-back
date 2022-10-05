import { findUserByEmail, findUserByUsername, createUser } from './userRepository';

const userRepository = {
    findUserByEmail,
    findUserByUsername,
    createUser,
};

export default userRepository;
