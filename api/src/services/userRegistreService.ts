// services/userService.ts
import bcrypt from 'bcrypt';
import User from '../models/User';
import { RateLimiterMemory } from 'rate-limiter-flexible'; // Para la tasa de limitación

// Configurar el limitador de tasa (ejemplo: 5 registros por 10 segundos)
const rateLimiter = new RateLimiterMemory({
    points: 5, // Número de intentos
    duration: 10 // Duración en segundos
});

// Definir el servicio de usuario
class UserService {
    static async registerUser(name: string, email: string, password: string, ip: string) {
        // Aplicar la tasa de limitación
        await rateLimiter.consume(ip); // Consumiendo un punto por cada intento

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('El usuario ya se encuentra registrado en la base de datos.');
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const user = await User.create({ name, email, password: hashedPassword });
        return user;
    }
}

export default UserService;
