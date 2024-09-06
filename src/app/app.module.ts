import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RuralProducerModule } from './rural-producer/rural-producer.module';

@Module({
  imports: [PrismaModule, RuralProducerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
