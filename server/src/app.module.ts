import { KisHttpService } from './module/kis/kis-http.service';
import { KisAuthService } from './module/kis/kis-auth.service';
import { KisModule } from './module/kis/kis.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { createDatabaseConfig } from './database/database.config';

@Module({
  imports: [
    KisModule, ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => createDatabaseConfig(config)
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
