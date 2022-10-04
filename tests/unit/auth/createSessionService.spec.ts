import { faker } from '@faker-js/faker';

import authService from '../../../src/services/auth';
import sessionRepository from '../../../src/repositories/sessions';
import userRepository from '../../../src/repositories/users';

import * as cryptUtils from '../../../src/utlis/cryptUtils';
import * as jwtUtils from '../../../src/utlis/jwtUtils';

describe('Create Session Service', () => {
    const password = faker.internet.password();

    const mockUser = {
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        picture: faker.internet.avatar(),
        password: cryptUtils.hashPassword(password),
    };

    const mockLoginData = { email: mockUser.email, password };

    const mockAccessToken = faker.datatype.uuid();
    const mockRefreshToken = faker.datatype.uuid();

    const mockCreateSessionData = { userId: mockUser.id, refreshToken: mockRefreshToken };

    beforeEach(async () => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    describe('given that login data is valid', () => {
        it('should create a session and return an access token and a refresh token', async () => {
            jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValueOnce(mockUser);
            jest.spyOn(jwtUtils, 'signJwt').mockReturnValueOnce(mockAccessToken);
            jest.spyOn(jwtUtils, 'signJwt').mockReturnValueOnce(mockRefreshToken);
            jest.spyOn(sessionRepository, 'createSession').mockResolvedValueOnce();

            await expect(authService.createSession(mockLoginData)).resolves.toEqual({
                accessToken: mockAccessToken,
                refreshToken: mockRefreshToken,
            });

            expect(userRepository.findUserByEmail).toBeCalledTimes(1);
            expect(sessionRepository.createSession).toBeCalledTimes(1);

            expect(userRepository.findUserByEmail).toBeCalledWith(mockLoginData.email);
            expect(sessionRepository.createSession).toBeCalledWith(mockCreateSessionData);
        });
    });

    describe('given that no account is linked to the email sent in login data', () => {
        it('should not create a new session', async () => {
            jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValueOnce(null);
            jest.spyOn(sessionRepository, 'createSession');

            await expect(authService.createSession(mockLoginData)).rejects.toEqual(expect.objectContaining({ type: 'error_unauthorized' }));

            expect(userRepository.findUserByEmail).toBeCalledTimes(1);
            expect(sessionRepository.createSession).not.toBeCalled();

            expect(userRepository.findUserByEmail).toBeCalledWith(mockLoginData.email);
        });
    });

    describe('given that wrong password to an existing account was sent in login data', () => {
        it('should not create a new session', async () => {
            const mockInvalidLoginData = { ...mockLoginData, password: faker.internet.password() };

            jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValueOnce(mockUser);
            jest.spyOn(sessionRepository, 'createSession');

            await expect(authService.createSession(mockInvalidLoginData)).rejects.toEqual(
                expect.objectContaining({ type: 'error_unauthorized' })
            );

            expect(userRepository.findUserByEmail).toBeCalledTimes(1);
            expect(sessionRepository.createSession).not.toBeCalled();

            expect(userRepository.findUserByEmail).toBeCalledWith(mockInvalidLoginData.email);
        });
    });
});
