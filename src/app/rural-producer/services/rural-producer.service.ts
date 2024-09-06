import { Injectable } from '@nestjs/common';
import { RuralProducer } from '@prisma/client';
import { RuralProducerServiceInterface } from './rural-producer.service.interface';
import { RuralProducerRepository } from '../repositories/rural-producer.repository';
import { CreateRuralProducerDto } from '../dtos/create-rural-producer.dto';

@Injectable()
export class RuralProducerService implements RuralProducerServiceInterface {
  constructor(
    private readonly ruralProducerRepository: RuralProducerRepository,
  ) {}

  async registerProducer(
    producer: CreateRuralProducerDto,
  ): Promise<RuralProducer> {
    return this.ruralProducerRepository.create(producer);
  }

  async getAllProducers(): Promise<RuralProducer[]> {
    return this.ruralProducerRepository.findAll();
  }

  async getProducerById(id: string): Promise<RuralProducer | null> {
    return this.ruralProducerRepository.findOne(id);
  }

  async updateProducerInfo(
    id: string,
    updateProducerDto: Partial<RuralProducer>,
  ): Promise<RuralProducer> {
    return this.ruralProducerRepository.update(id, updateProducerDto);
  }

  async deleteProducer(id: string): Promise<void> {
    return this.ruralProducerRepository.remove(id);
  }
}
