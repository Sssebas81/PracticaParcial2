import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@/auth/entities/user.entity';

import { Session } from '../entities/session.entity';
import { Game } from '../entities/game.entity';

import { SessionController } from './session.controller';
import { SessionService } from './session.service';

@Module({
    imports: [TypeOrmModule.forFeature([Session, Game, User])],
    controllers: [SessionController],
    providers: [SessionService],
    exports: [SessionService],
})
export class SessionModule {}
