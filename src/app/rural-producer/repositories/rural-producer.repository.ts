import { RuralProducer } from '@prisma/client';
import { RuralProducerRepositoryInterface } from './rural-producer.repository.interface';
import { PrismaService } from 'src/app/prisma/services/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { CreateRuralProducerDto } from '../dtos/create-rural-producer.dto';

@Injectable()
export class RuralProducerRepository
  implements RuralProducerRepositoryInterface
{
  private readonly logger = new Logger(RuralProducerRepository.name);
  constructor(private prismaService: PrismaService) {}

  async create(ruralProducer: CreateRuralProducerDto): Promise<RuralProducer> {
    this.logger.log('Adding a new producer on database');
    return this.prismaService.ruralProducer.create({
      data: ruralProducer,
    });
  }

  async findAll(): Promise<RuralProducer[]> {
    this.logger.log('Getting all producers from database');
    return this.prismaService.ruralProducer.findMany();
  }

  async findOne(id: string): Promise<RuralProducer | null> {
    this.logger.log(`Getting a producer by id from database - id: ${id}`);
    return this.prismaService.ruralProducer.findUnique({ where: { id } });
  }

  async update(
    id: string,
    ruralProducer: Partial<RuralProducer>,
  ): Promise<RuralProducer> {
    this.logger.log(`Updating a producer on database - id: ${id}`);
    return this.prismaService.ruralProducer.update({
      where: { id },
      data: ruralProducer,
    });
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing a producer from database - id: ${id}`);
    await this.prismaService.ruralProducer.delete({ where: { id } });
  }
}
