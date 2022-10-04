import { faker } from '@faker-js/faker';

import authService from '../../../src/services/auth';
import sessionRepository from '../../../src/repositories/sessions';

import * as jwtUtils from '../../../src/utlis/jwtUtils';

describe('Refresh Token Service', () => {
    const mockCurrentRefreshToken = faker.datatype.uuid();

    const mockSession = {
        id: faker.datatype.uuid(),
        userId: faker.datatype.uuid(),
        refreshToken: mockCurrentRefreshToken,
    };

    const mockValidAndNotExpiredDecodeTokenReturnData = {
        isTokenValid: true,
        isTokenExpired: false,
        payload: { id: mockSession.userId },
    };

    const mockNewAccessToken = faker.datatype.uuid();
    const mockNewRefreshToken = faker.datatype.uuid();

    beforeEach(async () => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    describe('given that refresh token is valid and has not expired', () => {
        it('should update user current session and return new access and refresh token', async () => {
            jest.spyOn(sessionRepository, 'findSessionByRefreshToken').mockResolvedValueOnce(mockSession);
            jest.spyOn(jwtUtils, 'verifyJwt').mockReturnValueOnce(mockValidAndNotExpiredDecodeTokenReturnData);
            jest.spyOn(jwtUtils, 'signJwt').mockReturnValueOnce(mockNewAccessToken);
            jest.spyOn(jwtUtils, 'signJwt').mockReturnValueOnce(mockNewRefreshToken);
            jest.spyOn(sessionRepository, 'updateSession').mockResolvedValueOnce();

            await expect(authService.refreshToken(mockCurrentRefreshToken)).resolves.toEqual({
                accessToken: mockNewAccessToken,
                refreshToken: mockNewRefreshToken,
            });

            expect(sessionRepository.findSessionByRefreshToken).toBeCalledTimes(1);
            expect(sessionRepository.updateSession).toBeCalledTimes(1);

            expect(sessionRepository.findSessionByRefreshToken).toBeCalledWith(mockCurrentRefreshToken);
            expect(sessionRepository.updateSession).toBeCalledWith(mockSession.id, mockNewRefreshToken);
        });
    });

    describe('given that refresh token is valid and has not expired, but cannot be found in sessions table', () => {
        it("delete all corresponding user's sessions", async () => {
            const mockValidRefreshTokenButNotFoundInSession = faker.datatype.uuid();

            jest.spyOn(sessionRepository, 'findSessionByRefreshToken').mockResolvedValueOnce(null);
            jest.spyOn(jwtUtils, 'verifyJwt').mockReturnValueOnce(mockValidAndNotExpiredDecodeTokenReturnData);
            jest.spyOn(sessionRepository, 'updateSession');

            await expect(authService.refreshToken(mockValidRefreshTokenButNotFoundInSession)).rejects.toEqual(
                expect.objectContaining({ type: 'error_forbidden' })
            );

            expect(sessionRepository.findSessionByRefreshToken).toBeCalledTimes(1);
            expect(sessionRepository.updateSession).not.toBeCalled();

            expect(sessionRepository.findSessionByRefreshToken).toBeCalledWith(mockValidRefreshTokenButNotFoundInSession);
        });
    });

    describe('given that refresh token has expired', () => {
        it('delete corresponding user session', async () => {
            const mockValitButExpiredDecodeTokenReturnData = {
                isTokenValid: true,
                isTokenExpired: true,
                payload: { id: mockSession.userId },
            };

            jest.spyOn(sessionRepository, 'findSessionByRefreshToken').mockResolvedValueOnce(mockSession);
            jest.spyOn(jwtUtils, 'verifyJwt').mockReturnValueOnce(mockValitButExpiredDecodeTokenReturnData);
            jest.spyOn(sessionRepository, 'deleteSession').mockResolvedValueOnce();
            jest.spyOn(sessionRepository, 'updateSession');

            await expect(authService.refreshToken(mockCurrentRefreshToken)).rejects.toEqual(
                expect.objectContaining({ type: 'error_forbidden' })
            );

            expect(sessionRepository.findSessionByRefreshToken).toBeCalledTimes(1);
            expect(sessionRepository.deleteSession).toBeCalledTimes(1);
            expect(sessionRepository.updateSession).not.toBeCalled();

            expect(sessionRepository.findSessionByRefreshToken).toBeCalledWith(mockCurrentRefreshToken);
            expect(sessionRepository.deleteSession).toBeCalledWith(mockSession.id);
        });
    });
});
