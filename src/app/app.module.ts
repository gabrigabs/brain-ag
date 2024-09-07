import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RuralProducerModule } from './rural-producer/rural-producer.module';
import { GraphModule } from './graph/graph.module';

@Module({
  imports: [PrismaModule, RuralProducerModule, GraphModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
