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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { RuralProducerService } from '../services/rural-producer.service';
import { CreateRuralProducerRequestDto } from '../dtos/requests/create-rural-producer-request.dto';
import { UpdateRuralProducerRequestDto } from '../dtos/requests/update-rural-producer-request.dto';
import { RuralProducerControllerInterface } from './rural-producer.controller.interface';
import { RuralProducerResponseDto } from '../dtos/responses/rural-producer-response.dto';

@ApiTags('rural-producers')
@Controller('rural-producers')
export class RuralProducerController
  implements RuralProducerControllerInterface
{
  private logger = new Logger(RuralProducerController.name);
  constructor(private readonly ruralProducerService: RuralProducerService) {}

  @ApiOperation({
    summary: 'Registers a new rural producer',
    description: 'Returns an object of created rural producer',
  })
  @ApiCreatedResponse({ type: RuralProducerResponseDto })
  @ApiBadRequestResponse({ description: 'Validation Error' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  createRuralProducer(
    @Body() createRuralProducerDto: CreateRuralProducerRequestDto,
  ): Promise<RuralProducerResponseDto> {
    return this.ruralProducerService.registerProducer(createRuralProducerDto);
  }

  @ApiOperation({
    summary: 'Retrieves a list of all rural producers',
    description: 'Returns an array of rural producers',
  })
  @ApiOkResponse({ type: [RuralProducerResponseDto] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  getAllRuralProducers(): Promise<RuralProducerResponseDto[]> {
    this.logger.log('Getting all rural producers');
    return this.ruralProducerService.getAllProducers();
  }

  @ApiOperation({
    summary: 'Retrieves a rural producer by id',
    description: 'Returns a object of found rural producer',
  })
  @ApiOkResponse({ type: RuralProducerResponseDto })
  @ApiNotFoundResponse({ description: 'Rural producer not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':id')
  getRuralProducerById(
    @Param('id') id: string,
  ): Promise<RuralProducerResponseDto> {
    this.logger.log(`Getting rural producer by id - id: ${id}`);
    return this.ruralProducerService.getProducerById(id);
  }

  @ApiOperation({
    summary: 'Updates a rural producer',
    description: 'Returns an object of updated rural producer',
  })
  @ApiOkResponse({ type: RuralProducerResponseDto })
  @ApiNotFoundResponse({ description: 'Rural producer not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Put(':id')
  updateRuralProducer(
    @Param('id') id: string,
    @Body() updateRuralProducerDto: UpdateRuralProducerRequestDto,
  ): Promise<RuralProducerResponseDto> {
    this.logger.log(`Updating rural producer by id - id: ${id}`);
    return this.ruralProducerService.updateProducerInfo(
      id,
      updateRuralProducerDto,
    );
  }

  @ApiOperation({
    summary: 'Deletes a rural producer',
    description: 'Returns nothing',
  })
  @ApiOkResponse({ description: 'Rural producer deleted successfully' })
  @ApiNotFoundResponse({ description: 'Rural producer not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete(':id')
  deleteRuralProducer(@Param('id') id: string): Promise<void> {
    this.logger.log(`Deleting rural producer by id - id: ${id}`);
    return this.ruralProducerService.deleteProducer(id);
  }
}
