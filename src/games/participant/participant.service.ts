import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/auth/entities/user.entity';

import { Participant } from '../entities/participant.entity';
import { Session } from '../entities/session.entity';

import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantService {
    constructor(
        @InjectRepository(Participant)
        private readonly participantRepository: Repository<Participant>,
        @InjectRepository(Session)
        private readonly sessionRepository: Repository<Session>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(dto: CreateParticipantDto) {
        const session = await this.sessionRepository.findOne({ where: { id: dto.sessionId } });
        if (!session) {
            throw new NotFoundException(`Session with id ${dto.sessionId} not found`);
        }

        const user = await this.userRepository.findOne({ where: { id: dto.userId } });
        if (!user) {
            throw new NotFoundException(`User with id ${dto.userId} not found`);
        }

        const participant = this.participantRepository.create({
            score: dto.score,
            position: dto.position,
            isWinner: dto.isWinner,
            session,
            user,
        });
        return this.participantRepository.save(participant);
    }

    findAll() {
        return this.participantRepository.find({ relations: ['session', 'user'] });
    }

    async findById(id: number) {
        const participant = await this.participantRepository.findOne({
            where: { id },
            relations: ['session', 'user'],
        });
        if (!participant) {
            throw new NotFoundException(`Participant with id ${id} not found`);
        }
        return participant;
    }

    async update(id: number, dto: UpdateParticipantDto) {
        const participant = await this.findById(id);

        if (dto.sessionId) {
            const session = await this.sessionRepository.findOne({ where: { id: dto.sessionId } });
            if (!session) {
                throw new NotFoundException(`Session with id ${dto.sessionId} not found`);
            }
            participant.session = session;
        }

        if (dto.userId) {
            const user = await this.userRepository.findOne({ where: { id: dto.userId } });
            if (!user) {
                throw new NotFoundException(`User with id ${dto.userId} not found`);
            }
            participant.user = user;
        }

        return this.participantRepository.save({ ...participant, ...dto });
    }

    async remove(id: number) {
        await this.findById(id);
        return this.participantRepository.delete(id);
    }
}
