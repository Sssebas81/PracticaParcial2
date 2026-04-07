import { Module } from '@nestjs/common';
import { SessionsService } from './session.service';
import { SessionController } from './session.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Session} from '../entities/session.entity';
import {GameModule} from '../game/game.module';
import {UserModule} from '@/auth/user/user.module';

@Module({
  providers: [SessionsService],
  imports: [TypeOrmModule.forFeature([Session]), GameModule, UserModule],
  exports: [SessionsService],
  controllers: [SessionController]
})
export class SessionModule {}
