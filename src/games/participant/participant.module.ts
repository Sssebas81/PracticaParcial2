import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@/auth/entities/user.entity';

import { Participant } from '../entities/participant.entity';
import { Session } from '../entities/session.entity';

import { ParticipantController } from './participant.controller';
import { ParticipantService } from './participant.service';

@Module({
    imports: [TypeOrmModule.forFeature([Participant, Session, User])],
    controllers: [ParticipantController],
    providers: [ParticipantService],
    exports: [ParticipantService],
})
export class ParticipantModule {}
