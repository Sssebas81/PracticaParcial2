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
        private readonly userService: UserService,
    ) {}

    async create(createGameDto: CreateGameDto) {
        const user = await this.userService.findById(createGameDto.createdById);
        const game = this.gameRepository.create({
            ...createGameDto,
            createdBy: user,
        });
        return this.gameRepository.save(game);
    }

    async findAll() {
        return await this.gameRepository.find({
            relations: ['createdBy'],
        });
    }

    async findById(id: number) {
        const game = await this.gameRepository.findOne({
            where: { id },
            relations: ['createdBy'],
        });
        if (!game) {
            throw new NotFoundException(`Game with id ${id} not found`);
        }
        return game;
    }

    async update(id: number, updateGameDto: UpdateGameDto) {
        await this.findById(id);
        await this.gameRepository.update(id, updateGameDto);
        return this.findById(id);
    }

    async remove(id: number) {
        await this.findById(id);
        return this.gameRepository.delete(id);
    }
}
