import { Request, Response } from 'express';
import { pool } from '../db';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (existing.rows.length > 0) {
            return res.status(400).json({ error: 'Correo ya registrado' });
        }

        const result = await pool.query(
            `INSERT INTO users (id, name, email, password_hash)
       VALUES (gen_random_uuid(), $1, $2, $3)
       RETURNING id, name, email, created_at`,
            [name, email, password] // sin encriptar
        );

        res.status(201).json({ message: 'Usuario creado', user: result.rows[0] });
    } catch (err: any) {
        console.error('🛑 Error en registro:', err.message);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña requeridos' });
        }

        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1 AND password_hash = $2',
            [email, password] // sin encriptar
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ id: result.rows[0].id }, JWT_SECRET, {
            expiresIn: '1d'
        });

        res.json({ message: 'Login exitoso', token });
    } catch (err: any) {
        console.error('🛑 Error en login:', err.message);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};
