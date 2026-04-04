import { Injectable } from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

import { UpdateGameDto } from './dto/update-game.dto';
import {CreateGameDto} from './dto/create-game.dto';
import {Game} from '../entities/game.entity';
import {UserService} from '@/auth/user/user.service';

@Injectable()
export class GamesService {

    constructor(

        @InjectRepository(Game)
        private readonly gameRepository: Repository<Game>,
        private readonly userService: UserService

    ){}

    findById(id:number){
        return this.gameRepository.findOneBy({id})
    }

    findAll(){
        return this.gameRepository.find();
    }

    async update (id:number, updateGameDto: UpdateGameDto){
        await this.gameRepository.update(id, updateGameDto)
        return this.gameRepository.findOneBy({id})
    }

    
    async remove (id:number){
        const result = await this.gameRepository.delete(id);

        if(result.affected){
            return { id }
        }

        return null;
    }

    async create (createGameDto: CreateGameDto){
        
        
        const creator = await this.userService.findById(createGameDto.created_by)

        if (!creator){

            throw new Error('Creator not found')
        }

        const newGame = this.gameRepository.create({
            ...createGameDto,
            createdBy:creator
        })

        return this.gameRepository.save(newGame)
    }

    



}
