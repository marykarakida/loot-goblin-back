import bcrypt from 'bcrypt';

export function hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
}
