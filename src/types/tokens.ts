interface TokenPayloadData {
    id: string;
}

interface SessionData {
    accessToken: string;
    refreshToken: string;
}

export { TokenPayloadData, SessionData };
