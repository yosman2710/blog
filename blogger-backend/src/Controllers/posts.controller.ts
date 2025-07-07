import { Request, Response } from 'express';
import { db } from '../db';

export const getPosts = async (_req: Request, res: Response) => {
    const result = await db.query(`
    SELECT p.id, p.title, p.image_url, p.created_at, u.name AS author_name
    FROM posts p JOIN users u ON p.author_id = u.id
    WHERE p.published = true ORDER BY p.created_at DESC
  `);
    res.json(result.rows);
};

export const getPostById = async (req: Request, res: Response) => {
    const result = await db.query(`
    SELECT p.*, u.name AS author_name
    FROM posts p JOIN users u ON p.author_id = u.id
    WHERE p.id = $1 AND p.published = true
  `, [req.params.id]);

    if (result.rows.length === 0) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(result.rows[0]);
};

export const createPost = async (req: Request, res: Response) => {
    const { title, content, image_url, userId } = req.body;
    const result = await db.query(`
    INSERT INTO posts (title, content, image_url, author_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `, [title, content, image_url, userId]);
    res.status(201).json({ message: 'Post creado', post: result.rows[0] });
};
