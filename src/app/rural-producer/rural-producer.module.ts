import { Module } from '@nestjs/common';
import { RuralProducerService } from './services/rural-producer.service';
import { RuralProducerController } from './controllers/rural-producer.controller';
import { PrismaService } from '../prisma/services/prisma.service';
import { RuralProducerRepository } from './repositories/rural-producer.repository';

@Module({
  controllers: [RuralProducerController],
  providers: [RuralProducerService, RuralProducerRepository, PrismaService],
  exports: [RuralProducerRepository],
})
export class RuralProducerModule {}
