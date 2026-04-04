import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/auth/entities/user.entity';

import { Session, SessionStatus } from '../entities/session.entity';
import { Game } from '../entities/game.entity';

import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(Session)
        private readonly sessionRepository: Repository<Session>,
        @InjectRepository(Game)
        private readonly gameRepository: Repository<Game>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(dto: CreateSessionDto) {
        const game = await this.gameRepository.findOne({ where: { id: dto.gameId } });
        if (!game) {
            throw new NotFoundException(`Game with id ${dto.gameId} not found`);
        }

        const host = await this.userRepository.findOne({ where: { id: dto.hostId } });
        if (!host) {
            throw new NotFoundException(`User with id ${dto.hostId} not found`);
        }

        const session = this.sessionRepository.create({
            status: dto.status as SessionStatus,
            notes: dto.notes,
            game,
            host,
        });
        return this.sessionRepository.save(session);
    }

    findAll() {
        return this.sessionRepository.find({ relations: ['game', 'host', 'participants'] });
    }

    async findById(id: number) {
        const session = await this.sessionRepository.findOne({
            where: { id },
            relations: ['game', 'host', 'participants'],
        });
        if (!session) {
            throw new NotFoundException(`Session with id ${id} not found`);
        }
        return session;
    }

    async update(id: number, dto: UpdateSessionDto) {
        const session = await this.findById(id);

        if (dto.gameId) {
            const game = await this.gameRepository.findOne({ where: { id: dto.gameId } });
            if (!game) {
                throw new NotFoundException(`Game with id ${dto.gameId} not found`);
            }
            session.game = game;
        }

        if (dto.hostId) {
            const host = await this.userRepository.findOne({ where: { id: dto.hostId } });
            if (!host) {
                throw new NotFoundException(`User with id ${dto.hostId} not found`);
            }
            session.host = host;
        }

        if (dto.status) {
            session.status = dto.status as SessionStatus;
        }
        if (dto.notes !== undefined) {
            session.notes = dto.notes;
        }

        return this.sessionRepository.save(session);
    }

    async remove(id: number) {
        await this.findById(id);
        return this.sessionRepository.delete(id);
    }
}
