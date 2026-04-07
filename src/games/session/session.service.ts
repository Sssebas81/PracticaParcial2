import { Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Session} from '../entities/session.entity';
import {Repository} from 'typeorm';
import {UserService} from '@/auth/user/user.service';
import { GameService } from '../game/game.service'; 
import { UpdateSessionDto } from './dto/update-session.dto'; 
import { CreateSessionDto } from './dto/create-session.dto'; 


@Injectable()
export class SessionsService {        
    constructor(
        @InjectRepository(Session)
        private readonly sessionRepository: Repository<Session>,
        private readonly gameService: GameService,
        private readonly userService: UserService
    ) {}

    findAll() {
        return this.sessionRepository.find();
    }

    async findById(id: number) {
        const session = await this.sessionRepository.findOneBy({id})

        if (!session) {
            throw new NotFoundException('Session not found')
        }

        return session
    }

    async update(id: number, updateSessionDto: UpdateSessionDto) {
        const session = await this.sessionRepository.findOne({where: {id}})

        if (!session) {
            throw new NotFoundException('Session not found')
        }

        
    }
}