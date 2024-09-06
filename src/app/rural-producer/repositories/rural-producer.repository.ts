import { RuralProducer } from '@prisma/client';
import { RuralProducerRepositoryInterface } from './rural-producer.repository.interface';
import { PrismaService } from 'src/app/prisma/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateRuralProducerDto } from '../dtos/create-rural-producer.dto';

@Injectable()
export class RuralProducerRepository
  implements RuralProducerRepositoryInterface
{
  constructor(private prismaService: PrismaService) {}

  async create(ruralProducer: CreateRuralProducerDto): Promise<RuralProducer> {
    return this.prismaService.ruralProducer.create({
      data: ruralProducer,
    });
  }

  async findAll(): Promise<RuralProducer[]> {
    return this.prismaService.ruralProducer.findMany();
  }

  async findOne(id: string): Promise<RuralProducer | null> {
    return this.prismaService.ruralProducer.findUnique({ where: { id } });
  }

  async update(
    id: string,
    ruralProducer: Partial<RuralProducer>,
  ): Promise<RuralProducer> {
    return this.prismaService.ruralProducer.update({
      where: { id },
      data: ruralProducer,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prismaService.ruralProducer.delete({ where: { id } });
  }
}
