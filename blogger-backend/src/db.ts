import * as pg from "pg";
import {
    DB_DATABASE,
    DB_HOST,
    DB_PASSWORD,
    PORT,
    DB_USER,
} from "../config";

export const pool = new pg.Pool({
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: PORT,
});