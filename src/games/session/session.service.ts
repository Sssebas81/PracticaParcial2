import { Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Session} from '../entities/session.entity';
import {Repository} from 'typeorm';
import {UserService} from '@/auth/user/user.service';
import {GamesService} from '../game/game.service';
import {UpdateSessionDto} from './dto/update-session.dto';
import {CreateSessionDto} from './dto/create-session.dto';


@Injectable()
export class SessionsService {
    constructor(
        @InjectRepository(Session)
        private readonly sessionRepository: Repository<Session>,
        private readonly userService: UserService,
        private readonly gameService: GamesService
    ){}

    async findAll(){
        return await this.sessionRepository.find();
    }

    
    async findById(id:number){
        return await this.sessionRepository.findOneBy({id});
    }

    async remove(id:number){
        const result = await this.sessionRepository.delete(id)

        if (result.affected) {
            return {id}
        }
         return null
    }

    async update(id: number, updateSessionDto:UpdateSessionDto){

        await this.sessionRepository.update(id, {
            status: updateSessionDto.status,
            notes: updateSessionDto.notes
        })

        return this.sessionRepository.findOneBy({id})

    }

    async create(createSessionDto:CreateSessionDto){

        const host = await this.userService.findById(createSessionDto.hostId)
        if (!host) {
             throw new NotFoundException ('User not found')
        }

        const game = await this.gameService.findById(createSessionDto.gameId)
        if (!game) {
             throw new NotFoundException ('Game not found')
        }

        const newSession = this.sessionRepository.create({
            ...createSessionDto,
            host,
            game
        })

        return this.sessionRepository.save(newSession)

    }

        
    } 
