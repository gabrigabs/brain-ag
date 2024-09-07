import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RuralProducer } from '@prisma/client';
import { RuralProducerServiceInterface } from './rural-producer.service.interface';
import { RuralProducerRepository } from '../repositories/rural-producer.repository';
import { CreateRuralProducerDto } from '../dtos/create-rural-producer.dto';
import {
  formatCpfOrCnpj,
  validateIsCpfOrCnpj,
} from '../../../app/commons/utils/cpf-cnpj.util';
import { validateFarmArea } from '../utils/rural-producer.util';
import { UpdateRuralProducerDto } from '../dtos/update-rural-producer.dto';

@Injectable()
export class RuralProducerService implements RuralProducerServiceInterface {
  private logger = new Logger(RuralProducerService.name);
  constructor(
    private readonly ruralProducerRepository: RuralProducerRepository,
  ) {}

  async registerProducer(
    producer: CreateRuralProducerDto,
  ): Promise<RuralProducer> {
    this.logger.log('Tryng to register a new producer on repository');
    await this.validateRuralProducer(producer);

    producer.cpfOrCnpj = formatCpfOrCnpj(producer.cpfOrCnpj);

    return this.ruralProducerRepository.create(producer);
  }

  async getAllProducers(): Promise<RuralProducer[]> {
    this.logger.log('Getting all producers from repository');
    return this.ruralProducerRepository.findAll();
  }

  async getProducerById(id: string): Promise<RuralProducer | null> {
    this.logger.log(`Getting producer by id from repository - id: ${id}`);
    const producer = await this.ruralProducerRepository.findOne(id);

    if (!producer) {
      this.logger.error(
        `Failed to get producer - producer not found - id: ${id}`,
      );
      throw new HttpException('Producer not found', HttpStatus.NOT_FOUND);
    }

    return producer;
  }

  async updateProducerInfo(
    id: string,
    updateProducerDto: UpdateRuralProducerDto,
  ): Promise<RuralProducer> {
    const existingProducer = await this.getProducerById(id);

    const updatedProducer: RuralProducer = {
      ...existingProducer,
      ...updateProducerDto,
    };
    await this.validateRuralProducer(updatedProducer);

    updatedProducer.cpfOrCnpj = formatCpfOrCnpj(updatedProducer.cpfOrCnpj);

    return this.ruralProducerRepository.update(id, updatedProducer);
  }

  async deleteProducer(id: string): Promise<void> {
    this.logger.log(
      `Requesting to delete producer by id to repository - id: ${id}`,
    );
    await this.getProducerById(id);

    return this.ruralProducerRepository.remove(id);
  }

  private async validateRuralProducer(
    producer: Partial<RuralProducer>,
  ): Promise<void> {
    const isValidCpfOrCnpj = validateIsCpfOrCnpj(producer.cpfOrCnpj);

    if (!isValidCpfOrCnpj) {
      this.logger.warn(
        'Failed to validate producer - invalid Cpf or Cnpj for producer',
      );
      throw new HttpException('Invalid Cpf or Cnpj', HttpStatus.BAD_REQUEST);
    }

    const isValidFarmArea = validateFarmArea(
      producer.farmTotalArea,
      producer.farmArableArea,
      producer.farmVegetationArea,
    );

    if (!isValidFarmArea) {
      this.logger.warn(
        'Failed to validate producer - Invalid farm area for producer',
      );
      throw new HttpException(
        'The sum of farm arable area and vegetation area must be lower than farm total area',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
