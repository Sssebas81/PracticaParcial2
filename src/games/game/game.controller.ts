import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { GamesService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('game')
export class GameController {

    constructor(private readonly gamesService: GamesService) {}

    @Post()
    create(@Body() createGameDto: CreateGameDto) {
        return this.gamesService.create(createGameDto);
    }

    @Get()
    findAll() {
        return this.gamesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.gamesService.findById(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
        return this.gamesService.update(+id, updateGameDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.gamesService.remove(+id);
    }
}

