import { Module } from '@nestjs/common';

import { GameModule } from './game/game.module';
import { CommentService } from './comment/comment.service';
import { CommentController } from './comment/comment.controller';
import { ParticipantController } from './participant/participant.controller';
import { ParticipantService } from './participant/participant.service';
import { SessionService } from './session/session.service';
import { SessionController } from './session/session.controller';

@Module({
    imports: [GameModule],
    providers: [CommentService, ParticipantService, SessionService],
    controllers: [CommentController, ParticipantController, SessionController],
})
export class GamesModule {}
