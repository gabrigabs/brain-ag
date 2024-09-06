import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RuralProducerService } from '../services/rural-producer.service';
import { CreateRuralProducerDto } from '../dtos/create-rural-producer.dto';
import { UpdateRuralProducerDto } from '../dtos/update-rural-producer.dto';
import { RuralProducerControllerInterface } from './rural-producer.controller.interface';
import { RuralProducer } from '@prisma/client';

@Controller('rural-producers')
export class RuralProducerController
  implements RuralProducerControllerInterface
{
  constructor(private readonly ruralProducerService: RuralProducerService) {}

  @Post()
  createRuralProducer(
    @Body() createRuralProducerDto: CreateRuralProducerDto,
  ): Promise<RuralProducer> {
    return this.ruralProducerService.registerProducer(createRuralProducerDto);
  }

  @Get()
  getAllRuralProducers(): Promise<RuralProducer[]> {
    return this.ruralProducerService.getAllProducers();
  }

  @Get(':id')
  getRuralProducerById(@Param('id') id: string): Promise<RuralProducer | null> {
    return this.ruralProducerService.getProducerById(id);
  }

  @Put(':id')
  updateRuralProducer(
    @Param('id') id: string,
    @Body() updateRuralProducerDto: UpdateRuralProducerDto,
  ): Promise<RuralProducer> {
    return this.ruralProducerService.updateProducerInfo(
      id,
      updateRuralProducerDto,
    );
  }

  @Delete(':id')
  deleteRuralProducer(@Param('id') id: string): Promise<void> {
    return this.ruralProducerService.deleteProducer(id);
  }
}
