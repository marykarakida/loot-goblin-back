import sessionRepository from '../../repositories/sessions';
import userRepository from '../../repositories/users';

import { verifyPassword } from '../../utlis/cryptUtils';
import { unauthorizedError } from '../../utlis/errorUtils';
import { signJwt } from '../../utlis/jwtUtils';

import { User, LoginData } from '../../types/users';
import { TokenPayloadData, SessionData } from '../../types/tokens';

export async function createSessionService(loginData: LoginData): Promise<SessionData> {
    const { email, password } = loginData;

    const user: User | null = await userRepository.findUserByEmail(email);
    if (!user) throw unauthorizedError('Cannot create session');

    const passwordValid: boolean = verifyPassword(password, user.password);
    if (!passwordValid) throw unauthorizedError('Cannot create session');

    const payload: TokenPayloadData = { id: user.id };
    const accessToken: string = signJwt(payload, process.env.ACCESS_TOKEN_EXPIRE as string, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE });
    const refreshToken: string = signJwt(payload, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    });

    await sessionRepository.createSession({ userId: user.id, refreshToken });

    return { accessToken, refreshToken };
}
