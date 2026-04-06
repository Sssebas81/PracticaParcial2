import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Comment} from '../entities/comment.entity';
import {GamesModule} from '../games.module';
import {CommentService} from './comment.service';
import {UsersModule} from '@/auth/user/user.module';
import { CommentController } from './comment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UsersModule, GamesModule],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
