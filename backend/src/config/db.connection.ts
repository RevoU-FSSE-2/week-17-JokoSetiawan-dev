import mysql from 'mysql2';
import { DBConfig } from './db.config';
import 'dotenv/config'

export const db = mysql.createConnection({
    host: DBConfig.HOST,
    user: DBConfig.USER,
    password: DBConfig.PASSWORD,
    database: DBConfig.DB,
    port: +DBConfig.PORT!,
    connectTimeout: 20000
})