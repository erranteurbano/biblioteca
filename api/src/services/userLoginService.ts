import bcrypt from 'bcrypt';
import User from '../models/User';
import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible'; // Importamos RateLimiterRes

const rateLimiter = new RateLimiterMemory({
    points: 5, // Número de intentos permitidos
    duration: 10 // Duración en segundos
});

class UserService {
    static async loginUser(email: string, password: string, ip: string) {
        try {
            // Limitar la tasa de intentos de inicio de sesión por IP
            await rateLimiter.consume(ip);

            // Buscar al usuario por correo electrónico
            const user = await User.findOne({ where: { email } });

            if (!user) {
                // Si el usuario no existe, lanzar un error genérico
                throw new Error('Credenciales incorrectas');
            }

            // Comparar la contraseña proporcionada con la almacenada
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                // Si la contraseña es incorrecta, lanzar un error genérico
                throw new Error('Credenciales incorrectas');
            }

            // Si todo es correcto, devuelve el usuario
            return user;

        } catch (error: any) {
            // Si el error es de Rate Limiter, verificamos si es una instancia de RateLimiterRes
            if (error instanceof RateLimiterRes) {
                throw new Error('Demasiados intentos fallidos. Intente nuevamente en unos segundos.');
            }

            // Otros errores se lanzan para ser manejados en el controlador
            throw error;
        }
    }
}

export default UserService;


