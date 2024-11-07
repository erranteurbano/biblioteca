// utils/jwt.ts
import jwt from 'jsonwebtoken';

export const generateToken = (userId: number) => {
    const secret = process.env.JWT_SECRET || 'default_secret'; // Usa un valor por defecto si no se encuentra la clave
    const token = jwt.sign({ id: userId }, secret, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h' // Usa el tiempo de expiración del .env
    });
    return token;
};
