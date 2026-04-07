import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Game} from '../entities/game.entity';
import {UserModule} from '@/auth/user/user.module';

@Module({
  providers: [GameService],
  imports: [TypeOrmModule.forFeature([Game]), UserModule],
  exports: [GameService],
  controllers: [GameController]
})
export class GameModule {}
