import { ConfigService } from "@nestjs/config";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { entities } from "./database.entities";

export const createDatabaseConfig = (config: ConfigService) => ({
    driver: PostgreSqlDriver,
    host: config.get('DB_HOST') || 'localhost',
    port: parseInt(config.get('DB_PORT') ?? "5432"),
    user: config.get('DB_USERNAME'),
    password: config.get('DB_PASSWORD'),
    dbName: config.get('DB_DATABASE'),
    entities: entities,
    debug: process.env.NODE_ENV !== 'production',
    migrations: {
        path: 'dist/migrations',
        pathTs: 'src/migrations',
    },
});