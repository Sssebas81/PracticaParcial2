import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Comment} from '../entities/comment.entity';
import {Repository} from 'typeorm';
import {CreateCommentDto} from './dto/create-comment.dto';
import {UserService} from '@/auth/user/user.service';
import {GamesService} from '../game/game.service';

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        private readonly userService: UserService,
        private readonly gameService: GamesService,

    ){}

    async findAll(){
        return await this.commentRepository.find();
    }

    
    async findById(id:number){
        return await this.commentRepository.findOneBy({id});
    }

    async remove(id:number){
        const result = await this.commentRepository.delete({id})
        if (result.affected) {
            return { id };
        }
        return null;
    }

    async update(id:number, content: string){
        await this.commentRepository.update(id,{content})
        return this.commentRepository.findOneBy({id})
    }

    async create(createCommentDto: CreateCommentDto){
        const user = this.userService.findById(createCommentDto.userId)
        if (!user) {
            throw new Error ('User not Found')
        }

        const game = this.gameService.findById(createCommentDto.gameId)
        if (!game) {
            throw new Error ('Game not Found')
        }

        const newComment = this.commentRepository.create({
            ...createCommentDto
        })

        return this.commentRepository.save(newComment)
    }
}
