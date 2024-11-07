import { Request, Response } from 'express';
import UserService from '../services/userLoginService'; // Servicio de usuario
import { generateToken } from '../utils/jwt';

const goodRequest: number = 200;
const TooManyRequests: number = 429;
const Unauthorized: number = 401; // Código de estado para credenciales incorrectas
const InternalServerError: number = 500;

const login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const ip = req.ip || req.socket.remoteAddress; // Obtener la IP del cliente

    try {
        // Intentar iniciar sesión usando el servicio
        const user = await UserService.loginUser(email, password, ip!);

        // Generar token JWT si la autenticación fue exitosa
        const token = generateToken(user.id);

        // Establecer el token en las cabeceras o en una cookie (opcional)
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        // Retornar los detalles del usuario y el token
        return res.status(goodRequest).json({
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            message:"inicio de session exitoso"
        });

    } catch (error: any) {

        // Manejo de error por demasiados intentos fallidos
        if (error.message === 'Demasiados intentos fallidos. Intente nuevamente en unos segundos.') {
            return res.status(TooManyRequests).json({
                success: false,
                message: error.message,
            });
        }

        // Manejo de error por credenciales incorrectas o usuario no registrado
        if (error.message === 'Credenciales incorrectas') {
            return res.status(Unauthorized).json({
                success: false,
                message: 'Correo o contraseña incorrectos. Si no tienes una cuenta, regístrate.',
            });
        }

        // Manejo de otros errores (error 500)
        console.error(error);
        return res.status(InternalServerError).json({
            success: false,
            message: 'Error en el servidor. Por favor, intenta nuevamente más tarde.'
        });
    }
};

export default login;
