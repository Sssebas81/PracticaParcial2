import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/auth/entities/user.entity';

import { Comment } from '../entities/comment.entity';
import { Game } from '../entities/game.entity';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        @InjectRepository(Game)
        private readonly gameRepository: Repository<Game>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(dto: CreateCommentDto) {
        const game = await this.gameRepository.findOne({ where: { id: dto.gameId } });
        if (!game) {
            throw new NotFoundException(`Game with id ${dto.gameId} not found`);
        }

        const user = await this.userRepository.findOne({ where: { id: dto.userId } });
        if (!user) {
            throw new NotFoundException(`User with id ${dto.userId} not found`);
        }

        const comment = this.commentRepository.create({
            content: dto.content,
            game,
            user,
        });
        return this.commentRepository.save(comment);
    }

    findAll() {
        return this.commentRepository.find({ relations: ['game', 'user'] });
    }

    async findById(id: number) {
        const comment = await this.commentRepository.findOne({
            where: { id },
            relations: ['game', 'user'],
        });
        if (!comment) {
            throw new NotFoundException(`Comment with id ${id} not found`);
        }
        return comment;
    }

    async update(id: number, dto: UpdateCommentDto) {
        const comment = await this.findById(id);

        if (dto.gameId) {
            const game = await this.gameRepository.findOne({ where: { id: dto.gameId } });
            if (!game) {
                throw new NotFoundException(`Game with id ${dto.gameId} not found`);
            }
            comment.game = game;
        }

        if (dto.userId) {
            const user = await this.userRepository.findOne({ where: { id: dto.userId } });
            if (!user) {
                throw new NotFoundException(`User with id ${dto.userId} not found`);
            }
            comment.user = user;
        }

        return this.commentRepository.save({ ...comment, ...dto });
    }

    async remove(id: number) {
        await this.findById(id);
        return this.commentRepository.delete(id);
    }
}
