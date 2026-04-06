import { Module } from '@nestjs/common';
import {Participant} from '../entities/participant.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ParticipantService} from './participant.service';
import {UsersModule} from '@/auth/user/user.module';
import { ParticipantController } from './participant.controller';
import { SessionsModule} from '../session/session.module';

@Module({
    imports: [TypeOrmModule.forFeature([Participant]), SessionsModule, UsersModule],
    providers: [ParticipantService],
    controllers: [ParticipantController],
    exports: [ParticipantService],
})
export class ParticipantModule {}
