import { config } from 'dotenv';
import argsUtil from './args.util.js';

const { env } = argsUtil;

const path = './.env.' + env

config({ path: path });

const envUtil = {
    PORT: process.env.PORT,
    DATABASE_URI: process.env.DATABASE_URI,
    SECRET_KEY: process.env.SECRET_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
    BASE_URL: process.env.BASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK: process.env.GITHUB_CALLBACK
}

export default envUtil