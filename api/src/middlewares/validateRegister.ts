// middlewares/validateRegister.ts
import { Request, Response, NextFunction } from 'express';
import { validateRegisterInput } from '../utils/validationUtils';

const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    const { isValid, errors } = validateRegisterInput(name, email, password);

    if (!isValid) {
        return res.status(400).json({
            success: false,
            messages: errors,
        });
    }

    next();
};

export default validateRegister;






