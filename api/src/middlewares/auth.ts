import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomUserPayload } from '../types/express'; // Ajusta la ruta según tu estructura de carpetas

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as CustomUserPayload; // Cambia JwtPayload a CustomUserPayload
    req.user = decoded; // Asignación correcta con el tipo extendido
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};

export default authMiddleware;

