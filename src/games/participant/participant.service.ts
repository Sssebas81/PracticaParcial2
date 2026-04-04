import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Participant} from '../entities/participant.entity';
import {Repository} from 'typeorm';
import {UserService} from '@/auth/user/user.service';
import {UpdateParticipantDto} from './dto/update-participant.dto';
import {CreateParticipantDto} from './dto/create-participant.dto';
import {SessionsService} from '../session/session.service';

@Injectable()
export class ParticipantService {

    constructor(
        @InjectRepository(Participant)
        private readonly participantRepository: Repository<Participant>,
        private readonly userService: UserService,
        private readonly sessionService: SessionsService,

    ){}

    async findAll(){
        await this.participantRepository.find();
    }

    async findById(id:number){
        await this.participantRepository.findOneBy({id});
    }

    async remove(id:number){
        const result = await this.participantRepository.delete({id})

        if (result.affected) {
            return { id }
        }

        return null

    }

    async update (id:number, updateParticipantDto:UpdateParticipantDto){
        await this.participantRepository.update(id, updateParticipantDto)
        return this.participantRepository.findOneBy({id})
    }

    async create (id:number, createParticipantDto: CreateParticipantDto){
        const user = await this.userService.findById(createParticipantDto.userId)
        if (!user) {
            throw new Error ('User not found')
        }

        const session = await this.sessionService.findById(createParticipantDto.sessionId)
        if (!session) {
            throw new Error ('Session not found')
        }
    }
}
