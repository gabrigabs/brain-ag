import { RuralProducer } from '@prisma/client';
import { RuralProducerRepositoryInterface } from './rural-producer.repository.interface';
import { PrismaService } from 'src/app/prisma/services/prisma.service';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateRuralProducerRequestDto } from '../dtos/requests/create-rural-producer-request.dto';

@Injectable()
export class RuralProducerRepository
  implements RuralProducerRepositoryInterface
{
  private readonly logger = new Logger(RuralProducerRepository.name);
  constructor(private prismaService: PrismaService) {}

  async create(
    ruralProducer: CreateRuralProducerRequestDto,
  ): Promise<RuralProducer> {
    try {
      this.logger.log('Adding a new producer on database');
      return this.prismaService.ruralProducer.create({ data: ruralProducer });
    } catch (error) {
      this.handleRepositoryError(
        `Error when trying to add a new producer on database - ${error}`,
        error.stack,
      );
    }
  }

  async findAll(): Promise<RuralProducer[]> {
    try {
      this.logger.log('Getting all producers from database');
      return this.prismaService.ruralProducer.findMany();
    } catch (error) {
      this.handleRepositoryError(
        `Error when trying to get producers from database - ${error}`,
        error.stack,
      );
    }
  }

  async findOne(id: string): Promise<RuralProducer | null> {
    try {
      this.logger.log(`Getting a producer by id from database - id: ${id}`);
      return this.prismaService.ruralProducer.findUnique({ where: { id } });
    } catch (error) {
      this.handleRepositoryError(
        `Error when trying to get a producer by id from database - ${error}`,
        error.stack,
      );
    }
  }

  async update(
    id: string,
    ruralProducer: Partial<RuralProducer>,
  ): Promise<RuralProducer> {
    try {
      this.logger.log(`Updating a producer on database - id: ${id}`);
      return this.prismaService.ruralProducer.update({
        where: { id },
        data: ruralProducer,
      });
    } catch (error) {
      this.handleRepositoryError(
        `Error when trying to update a producer on database - ${error}`,
        error.stack,
      );
    }
  }

  async remove(id: string): Promise<void> {
    try {
      this.logger.log(`Removing a producer from database - id: ${id}`);
      await this.prismaService.ruralProducer.delete({ where: { id } });
    } catch (error) {
      this.handleRepositoryError(
        `Error when trying to remove a producer on database - ${error}`,
        error.stack,
      );
    }
  }

  private handleRepositoryError(message: string, stack: string): void {
    this.logger.error(message, stack);
    throw new HttpException(
      'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
