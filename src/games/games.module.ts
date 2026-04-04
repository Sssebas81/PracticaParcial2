import { Module } from '@nestjs/common';

import { GameModule } from './game/game.module';
import { ParticipantModule } from './participant/participant.module';
import { SessionModule } from './session/session.module';
import { CommentModule } from './comment/comment.module';

@Module({
    imports: [GameModule, ParticipantModule, SessionModule, CommentModule],
})
export class GamesModule {}
