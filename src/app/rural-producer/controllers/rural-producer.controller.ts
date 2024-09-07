import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Logger,
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
  private logger = new Logger(RuralProducerController.name);
  constructor(private readonly ruralProducerService: RuralProducerService) {}

  @Post()
  createRuralProducer(
    @Body() createRuralProducerDto: CreateRuralProducerDto,
  ): Promise<RuralProducer> {
    return this.ruralProducerService.registerProducer(createRuralProducerDto);
  }

  @Get()
  getAllRuralProducers(): Promise<RuralProducer[]> {
    this.logger.log('Getting all rural producers');
    return this.ruralProducerService.getAllProducers();
  }

  @Get(':id')
  getRuralProducerById(@Param('id') id: string): Promise<RuralProducer | null> {
    this.logger.log(`Getting rural producer by id - id: ${id}`);
    return this.ruralProducerService.getProducerById(id);
  }

  @Put(':id')
  updateRuralProducer(
    @Param('id') id: string,
    @Body() updateRuralProducerDto: UpdateRuralProducerDto,
  ): Promise<RuralProducer> {
    this.logger.log(`Updating rural producer by id - id: ${id}`);
    return this.ruralProducerService.updateProducerInfo(
      id,
      updateRuralProducerDto,
    );
  }

  @Delete(':id')
  deleteRuralProducer(@Param('id') id: string): Promise<void> {
    this.logger.log(`Deleting rural producer by id - id: ${id}`);
    return this.ruralProducerService.deleteProducer(id);
  }
}
