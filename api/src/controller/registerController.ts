// controllers/register.ts
import { Request, Response } from 'express';
import UserService from '../services/userRegistreService';
import { ValidationError } from 'sequelize';
import { generateToken } from '../utils/jwt';

const Created:number = 201;
const BadRequest: number = 400;
const TooManyRequests: number = 429;
const  InternalServerError:number = 500;


const register = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password } = req.body;

    try {
        const ip = req.ip || req.socket.remoteAddress;

        if (!ip) {
            return res.status(BadRequest).json({
                success: false,
                message: 'No se pudo determinar la dirección IP del cliente.'
            });
        }

        // Llamar al servicio para registrar al usuario
        const user = await UserService.registerUser(name, email, password, ip);

        const { password: _, ...userWithoutPassword } = user.toJSON();

            // Generar el token JWT
            const token = generateToken(user.id);

        return res.status(Created).json({
            success: true,
            message: 'Usuario registrado exitosamente.',
            data: userWithoutPassword,
            token
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(BadRequest).json({
                success: false,
                message: 'Error de validación.',
                errors: error.errors.map(err => err.message)
            });
        } else if ((error as any).message === 'El usuario ya se encuentra registrado en la base de datos.') {
            return res.status(BadRequest).json({
                success: false,
                message: (error as any).message
            });
        } else if ((error as any).name === 'RateLimitExceeded') {
            return res.status(TooManyRequests).json({ // 429 Too Many Requests
                success: false,
                message: 'Demasiados intentos de registro. Por favor, inténtalo de nuevo más tarde.'
            });
        }
        console.error(error);
        return res.status(InternalServerError).json({
            success: false,
            message: 'Error en el servidor. Por favor, intenta nuevamente más tarde.'
        });
    }
};

export default register;




