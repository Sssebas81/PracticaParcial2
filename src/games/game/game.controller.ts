import { Body, Controller, Delete, Get, Param, Patch, Post, Res, ParseIntPipe } from '@nestjs/common';
import type { Response } from 'express';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Get()
    findAll() {
        return this.gameService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.gameService.findById(+id);
    }

    @Post()
    create(@Body() createGameDto: CreateGameDto) {
        return this.gameService.create(createGameDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
        return this.gameService.update(+id, updateGameDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response): Promise<Response> {
        const result = await this.gameService.remove(id);
        if (result) {
            return res.status(200).json(`Game with id ${id} deleted successfully`);
        }
        return res.status(404).json(`Game with id ${id} not found`);
    }
}
