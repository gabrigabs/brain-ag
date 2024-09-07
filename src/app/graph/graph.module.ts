import { Module } from '@nestjs/common';
import { RuralProducerRepository } from '../rural-producer/repositories/rural-producer.repository';
import { GraphService } from './services/graph.service';
import { PrismaService } from '../prisma/services/prisma.service';
import { GraphController } from './controllers/graph.controller';

@Module({
  providers: [PrismaService, RuralProducerRepository, GraphService],
  controllers: [GraphController],
})
export class GraphModule {}
