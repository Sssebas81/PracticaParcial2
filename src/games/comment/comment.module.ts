import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@/auth/entities/user.entity';

import { Comment } from '../entities/comment.entity';
import { Game } from '../entities/game.entity';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
    imports: [TypeOrmModule.forFeature([Comment, Game, User])],
    controllers: [CommentController],
    providers: [CommentService],
    exports: [CommentService],
})
export class CommentModule {}
