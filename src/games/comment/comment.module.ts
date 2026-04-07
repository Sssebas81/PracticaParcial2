import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Comment} from '../entities/comment.entity';
import {GameModule} from '../game/game.module';
import {CommentService} from './comment.service';
import {UsersModule} from '@/auth/user/user.module';
import { CommentController } from './comment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UsersModule, GameModule],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
