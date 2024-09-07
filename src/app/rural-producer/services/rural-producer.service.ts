import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  constructor(
    private readonly ruralProducerRepository: RuralProducerRepository,
  ) {}

  async registerProducer(
    producer: CreateRuralProducerDto,
  ): Promise<RuralProducer> {
    await this.validateRuralProducer(producer);

    producer.cpfOrCnpj = formatCpfOrCnpj(producer.cpfOrCnpj);

    return this.ruralProducerRepository.create(producer);
  }

  async getAllProducers(): Promise<RuralProducer[]> {
    return this.ruralProducerRepository.findAll();
  }

  async getProducerById(id: string): Promise<RuralProducer | null> {
    const producer = await this.ruralProducerRepository.findOne(id);

    if (!producer) {
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
    await this.getProducerById(id);

    return this.ruralProducerRepository.remove(id);
  }

  private async validateRuralProducer(
    producer: Partial<RuralProducer>,
  ): Promise<void> {
    const isValidCpfOrCnpj = validateIsCpfOrCnpj(producer.cpfOrCnpj);

    if (!isValidCpfOrCnpj) {
      throw new HttpException('Invalid Cpf or Cnpj', HttpStatus.BAD_REQUEST);
    }

    const isValidFarmArea = validateFarmArea(
      producer.farmTotalArea,
      producer.farmArableArea,
      producer.farmVegetationArea,
    );

    if (!isValidFarmArea) {
      throw new HttpException(
        'The sum of farm arable area and vegetation area must be lower than farm total area',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
