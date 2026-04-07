import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '@/auth/user/user.module';

import { Game } from '../entities/game.entity';

import { GameController } from './game.controller';
import { GameService } from './game.service';

@Module({
    controllers: [GameController],
    providers: [GameService],
    imports: [UserModule, TypeOrmModule.forFeature([Game])],
})
export class GameModule {}
