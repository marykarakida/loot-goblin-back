import bcrypt from 'bcrypt';

export function hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
}
