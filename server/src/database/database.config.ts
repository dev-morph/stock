import { ConfigService } from "@nestjs/config";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { entities } from "./database.entities";
import { MikroOrmModuleOptions } from "@mikro-orm/nestjs";

export const createDatabaseConfig = (config: ConfigService): MikroOrmModuleOptions => ({
    driver: PostgreSqlDriver,
    clientUrl: config.get('POSTGRES_URL'),
    // host: config.get('DB_HOST') || 'localhost',
    // port: parseInt(config.get('DB_PORT') ?? "5432"),
    // user: config.get('DB_USERNAME'),
    // password: config.get('DB_PASSWORD'),
    // dbName: config.get('DB_DATABASE'),
    entities: entities,
    debug: process.env.NODE_ENV !== 'production',
    migrations: {
        path: 'dist/migrations',
        pathTs: 'src/migrations',
    },
    driverOptions: {
        connection: {
            // 일부 환경(회사 프록시/루트CA 문제 등)에서 인증서 검증이 걸릴 수 있어 보조로 추가
            // 운영에서는 가능하면 인증서 검증을 유지하세요.
            ssl: { rejectUnauthorized: false },
            // 최소 설정이 필요하다면 ssl: true 도 가능
        },
    },
});