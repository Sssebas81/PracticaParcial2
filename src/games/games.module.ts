import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { ParticipantModule } from './participant/participant.module';
import { SessionsModule } from './session/session.module';
import { GameModule } from './game/game.module';

@Module({
    imports: [GameModule, CommentModule, ParticipantModule, SessionsModule],
})
export class GamesModule {}
