import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GamesService } from './game.service';

@Module({
  controllers: [GameController],
  providers: [GamesService]
})
export class GameModule {}
