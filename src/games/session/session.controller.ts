import { Body, Controller, Delete, Get, Param, Patch, Post, Res, ParseIntPipe } from '@nestjs/common';
import type { Response } from 'express';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Controller('session')
export class SessionController {
    constructor(private readonly sessionService: SessionService) {}

    @Get()
    findAll() {
        return this.sessionService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.sessionService.findById(+id);
    }

    @Post()
    create(@Body() createSessionDto: CreateSessionDto) {
        return this.sessionService.create(createSessionDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
        return this.sessionService.update(+id, updateSessionDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response): Promise<Response> {
        const result = await this.sessionService.remove(id);
        if (result) {
            return res.status(200).json(`Session with id ${id} deleted successfully`);
        }
        return res.status(404).json(`Session with id ${id} not found`);
    }
}
