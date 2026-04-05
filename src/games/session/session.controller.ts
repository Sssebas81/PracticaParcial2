import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { SessionsService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Controller('session')
export class SessionController {

    constructor(private readonly sessionsService: SessionsService) {}

    @Post()
    create(@Body() createSessionDto: CreateSessionDto) {
        return this.sessionsService.create(createSessionDto);
    }

    @Get()
    findAll() {
        return this.sessionsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.sessionsService.findById(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
        return this.sessionsService.update(+id, updateSessionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.sessionsService.remove(+id);
    }
}

