import 'dotenv/config';
import { defineConfig } from '@mikro-orm/postgresql';

export default defineConfig({
    clientUrl: process.env.POSTGRES_URL,      // sslmode=require
    entities: ['./dist/**/*.entity.js'],
    entitiesTs: ['./src/**/*.entity.ts'],
    migrations: { path: 'dist/migrations', pathTs: 'src/migrations' },
    driverOptions: { connection: { ssl: { rejectUnauthorized: false } } },
});