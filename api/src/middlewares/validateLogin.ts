// middlewares/validateLogin.ts
import { Request, Response, NextFunction } from 'express';
import { validateLoginInput, handleAuthError } from '../utils/validationUtils';

const BadRequest: number = 400;
const Unauthorized: number = 401;

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        const { isValid, errors } = validateLoginInput(email, password);

        if (!isValid) {
            return res.status(BadRequest).json({
                success: false,
                messages: errors,
            });
        }

        next(); // Mueve el next() aquí para que solo se llame si la validación es exitosa

    } catch (error) {
        const authError = handleAuthError(error as Error); // Cambiar as any a Error si es posible

        if (!authError.isValid) {
            return res.status(Unauthorized).json({
                success: false,
                message: authError.message
            });
        }

        // En caso de que haya un error no relacionado con la validación
        return next(error); // Pasa el error al siguiente middleware
    }
};

export default validateLogin;

