import { Body, Controller, Delete, Get, Param, Patch, Post, Res, ParseIntPipe } from '@nestjs/common';
import type { Response } from 'express';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Controller('participant')
export class ParticipantController {
    constructor(private readonly participantService: ParticipantService) {}

    @Get()
    findAll() {
        return this.participantService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.participantService.findById(+id);
    }

    @Post()
    create(@Body() createParticipantDto: CreateParticipantDto) {
        return this.participantService.create(createParticipantDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto) {
        return this.participantService.update(+id, updateParticipantDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response): Promise<Response> {
        const result = await this.participantService.remove(id);
        if (result) {
            return res.status(200).json(`Participant with id ${id} deleted successfully`);
        }
        return res.status(404).json(`Participant with id ${id} not found`);
    }
}
