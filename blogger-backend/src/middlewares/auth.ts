import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { CONFIG } from '../../config';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer '))
        return res.status(401).json({ error: 'Token no proporcionado' });

    try {
        const token = header.split(' ')[1];
        const decoded = jwt.verify(token, CONFIG.JWT_SECRET) as { id: string };
        req.body.userId = decoded.id;
        next();
    } catch {
        res.status(403).json({ error: 'Token inválido o expirado' });
    }
};
