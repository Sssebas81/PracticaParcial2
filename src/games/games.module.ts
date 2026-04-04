import { Module } from '@nestjs/common';

import { GameModule } from './game/game.module';
import { CommentModule } from './comment/comment.module';
import { GameModule } from './game/game.module';
import { ParticipantModule } from './participant/participant.module';
import { SessionModule } from './session/session.module';

@Module({
    imports: [GameModule, CommentModule, ParticipantModule, SessionModule],
})
export class GamesModule {}
