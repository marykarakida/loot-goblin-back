import sessionRepository from '../../repositories/sessions';

export async function finishSessionService(currentRefreshToken: string): Promise<void> {
    const foundSession = await sessionRepository.findSessionByRefreshToken(currentRefreshToken);

    if (foundSession) {
        await sessionRepository.deleteSession(foundSession.id);
    }
}
