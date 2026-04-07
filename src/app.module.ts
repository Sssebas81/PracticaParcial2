import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GamesModule } from './games/games.module';
import { SessionsService } from './games/session/session.service'; 
import {SessionModule} from './games/session/session.module';

type SupportedDbTypes = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mongodb' | 'oracle';
@Module({
    imports: [
        AuthModule,
        ConfigModule.forRoot({ isGlobal: true }), // Load .env file and make it available globally
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: configService.get<SupportedDbTypes>('DB_TYPE') ?? 'postgres',
                host: configService.get<string>('DB_HOST') ?? 'localhost',
                port: configService.get<number>('DB_PORT') ?? 5432,
                username: configService.get<string>('DB_USERNAME') ?? 'root',
                password: configService.get<string>('DB_PASSWORD') ?? 'root',
                database: configService.get<string>('DB_DATABASE') ?? 'test',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: configService.get<boolean>('DB_SYNCHRONIZE') ?? false,
            }),
        }),
        GamesModule,
    ],
    controllers: [AppController],
    providers: [AppService, SessionModule],
})
export class AppModule {}
