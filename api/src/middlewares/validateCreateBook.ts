// middlewares/validateCreateBook.ts
import { Request, Response, NextFunction } from 'express';
import { validateBookInput } from '../utils/validationUtils';

export const validateCreateBook = (req: Request, res: Response, next: NextFunction) => {
    const { title, author, publicationYear } = req.body;
    const { isValid, errors } = validateBookInput(title, author, publicationYear);

    if (!isValid) {
        return res.status(400).json({ errors });
    }

    next();
};
