import { Request, Response } from 'express';
import { db } from '../db';

export const getUserById = async (req: Request, res: Response) => {
    const result = await db.query(`
    SELECT id, name, email, created_at, updated_at
    FROM users WHERE id = $1
  `, [req.params.id]);

    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(result.rows[0]);
};

export const updateUserName = async (req: Request, res: Response) => {
    const { name } = req.body;
    const result = await db.query(`
    UPDATE users SET name = $1, updated_at = NOW()
    WHERE id = $2 RETURNING id, name, email, updated_at
  `, [name, req.params.id]);

    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Nombre actualizado', user: result.rows[0] });
};
