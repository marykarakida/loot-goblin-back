declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: number;
            DATABASE_URL: string;
            ACCESS_TOKEN_SECRET: string;
            REFRESH_TOKEN_SECRET: string;
            ACCESS_TOKEN_EXPIRE: string | number;
            REFRESH_TOKEN_EXPIRE: string | number;
        }
    }
}

export {};
