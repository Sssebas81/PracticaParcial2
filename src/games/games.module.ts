import { Module } from '@nestjs/common';

import { GameModule } from './game/game.module';
import { SessionModule } from './session/session.module';

@Module({
    imports: [GameModule, SessionModule],
})
export class GamesModule {}
