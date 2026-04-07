import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GamesService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '../entities/game.entity';
import { UsersModule } from '@/auth/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), UsersModule],
  controllers: [GameController],
  providers: [GamesService],
  exports: [GamesService]
})
export class GameModule {}
