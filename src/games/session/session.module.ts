import { Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersModule} from '@/auth/user/user.module';
import {GameModule} from '../game/game.module';
import {Session} from '../entities/session.entity';
import { SessionController } from './session.controller';
import {SessionsService} from './session.service';

@Module({
    providers: [SessionsService],
      imports: [TypeOrmModule.forFeature([Session]) , GameModule, UsersModule],
      exports: [SessionsService],
      controllers: [SessionController],
})
export class SessionsModule {
}