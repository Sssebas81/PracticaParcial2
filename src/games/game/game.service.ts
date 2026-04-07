import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from '@/auth/user/user.service';

import { Game } from '../entities/game.entity';

import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
    constructor(
        @InjectRepository(Game)
        private readonly gameRepository: Repository<Game>,
        private readonly userService: UserService
    ) {}

    findAll() {
        return this.gameRepository.find()
    }

    async findById(id: number) {
        const game = await this.gameRepository.findOneBy({id})

        if (!game) {
            throw new NotFoundException('Game not found')
        }

        return game
    }

    async update(id: number, dto: UpdateGameDto) {

        //hago una copia para poder adaptar los datos antes de guardar
        const updateData: any = { ...dto };

        const game = await this.gameRepository.findOne({where: {id}})

        if(!game) {
            throw new NotFoundException('Game not found')
        }

        if (dto.createdBy) {
        const user = await this.userService.findById(dto.createdBy);

        if (!user) {
            throw new NotFoundException('User not found');
        }
        
        await this.gameRepository.update(id,updateData)
        
        return await this.gameRepository.findOneBy({id});
        }
  
    }
        async create(createGameDto: CreateGameDto) {
            const user = await this.userService.findById(createGameDto.createdBy)

            if (!user) {
                throw new NotFoundException('User not found')
            }

            const newGame = this.gameRepository.create({
                ...createGameDto,
                createdBy: user
            })

            return await this.gameRepository.save(newGame)
        }

    async remove(id: number) {
        const game = await this.findById(id)

        if (!game) {
            throw new NotFoundException('Game not found')
        }

        await this.gameRepository.delete(game)

        return {id}
    }
}
