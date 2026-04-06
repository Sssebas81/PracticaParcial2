import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { ParticipantModule } from './participant/participant.module';
import { SessionsModule } from './session/session.module';

@Module({
    imports: [GamesModule, CommentModule, ParticipantModule, SessionsModule],
})
export class GamesModule {}
