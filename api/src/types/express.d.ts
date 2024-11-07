// @types/express.d.ts
import * as express from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface CustomUserPayload extends JwtPayload {
    id:string
    name:string,
    email:string,
    token:string
}

declare global {
    namespace Express {
        interface Request {
            user?:CustomUserPayload; // Puedes especificar un tipo más preciso según tus necesidades
        }
    }
}
