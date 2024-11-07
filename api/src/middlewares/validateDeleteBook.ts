// middlewares/validateDeleteBook.ts
import { Request, Response, NextFunction } from 'express';

export const validateDeleteBook = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        return res.status(400).json({ message: 'El ID del libro debe ser un número válido.' });
    }

    next();
};
