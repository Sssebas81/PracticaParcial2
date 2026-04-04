import { Body, Controller, Delete, Get, Param, Patch, Post, Res, ParseIntPipe } from '@nestjs/common';
import type { Response } from 'express';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get()
    findAll() {
        return this.commentService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.commentService.findById(+id);
    }

    @Post()
    create(@Body() createCommentDto: CreateCommentDto) {
        return this.commentService.create(createCommentDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
        return this.commentService.update(+id, updateCommentDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response): Promise<Response> {
        const result = await this.commentService.remove(id);
        if (result) {
            return res.status(200).json(`Comment with id ${id} deleted successfully`);
        }
        return res.status(404).json(`Comment with id ${id} not found`);
    }
}
