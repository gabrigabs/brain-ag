import { Test, TestingModule } from '@nestjs/testing';
import { RuralProducerController } from '../../../../src/app/rural-producer/controllers/rural-producer.controller';
import { RuralProducerService } from '../../../../src/app/rural-producer/services/rural-producer.service';
import {
  ruralProducerRequestMock,
  ruralProducerResponseMock,
} from '../mocks/rural-producer.mocks';
import { RuralProducerRepository } from '../../../../src/app/rural-producer/repositories/rural-producer.repository';
import { PrismaService } from '../../../../src/app/prisma/services/prisma.service';
import { Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AppModule } from '../../../../src/app/app.module';
describe('RuralProducerController', () => {
  let ruralProducerController: RuralProducerController;
  let ruralProducerService: RuralProducerService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [RuralProducerController],
      providers: [PrismaService, RuralProducerRepository, RuralProducerService],
    }).compile();

    ruralProducerController = moduleRef.get<RuralProducerController>(
      RuralProducerController,
    );
    ruralProducerService =
      moduleRef.get<RuralProducerService>(RuralProducerService);

    Logger.prototype.log = jest.fn();

    jest.clearAllMocks();
  });

  describe('registerProducer', () => {
    it('should create a rural producer', async () => {
      jest
        .spyOn(ruralProducerService, 'registerProducer')
        .mockResolvedValue(ruralProducerResponseMock);

      const result = await ruralProducerController.createRuralProducer(
        ruralProducerRequestMock,
      );

      expect(Logger.prototype.log).toHaveBeenCalledWith(
        'Registering a new rural producer',
      );

      expect(ruralProducerService.registerProducer).toHaveBeenCalledWith(
        ruralProducerRequestMock,
      );
      expect(result).toEqual(ruralProducerResponseMock);
    });
  });

  describe('getAllRuralProducers', () => {
    it('should return all rural producers', async () => {
      jest
        .spyOn(ruralProducerService, 'getAllProducers')
        .mockResolvedValue([ruralProducerResponseMock]);

      const result = await ruralProducerController.getAllRuralProducers();

      expect(Logger.prototype.log).toHaveBeenCalledWith(
        'Getting all rural producers',
      );

      expect(ruralProducerService.getAllProducers).toHaveBeenCalled();
      expect(result).toEqual([ruralProducerResponseMock]);
    });
  });

  describe('getRuralProducerById', () => {
    it('should return a rural producer by id', async () => {
      jest
        .spyOn(ruralProducerService, 'getProducerById')
        .mockResolvedValue(ruralProducerResponseMock);

      const requestId = randomUUID();

      const result = await ruralProducerController.getRuralProducerById(
        requestId,
      );

      expect(Logger.prototype.log).toHaveBeenCalledWith(
        `Getting rural producer by id - id: ${requestId}`,
      );

      expect(ruralProducerService.getProducerById).toHaveBeenCalledWith(
        requestId,
      );

      expect(result).toEqual(ruralProducerResponseMock);
    });
  });

  describe('updateRuralProducer', () => {
    it('should update a rural producer', async () => {
      jest
        .spyOn(ruralProducerService, 'updateProducerInfo')
        .mockResolvedValue(ruralProducerResponseMock);
      const requestId = randomUUID();

      const result = await ruralProducerController.updateRuralProducer(
        requestId,
        ruralProducerRequestMock,
      );

      expect(Logger.prototype.log).toHaveBeenCalledWith(
        `Updating rural producer by id - id: ${requestId}`,
      );

      expect(ruralProducerService.updateProducerInfo).toHaveBeenCalledWith(
        requestId,
        ruralProducerRequestMock,
      );
      expect(result).toEqual(ruralProducerResponseMock);
    });
  });

  describe('deleteRuralProducer', () => {
    it('should delete a rural producer', async () => {
      jest
        .spyOn(ruralProducerService, 'deleteProducer')
        .mockResolvedValue(undefined);

      const requestId = randomUUID();
      await ruralProducerController.deleteRuralProducer(requestId);

      expect(Logger.prototype.log).toHaveBeenCalledWith(
        `Deleting rural producer by id - id: ${requestId}`,
      );

      expect(ruralProducerService.deleteProducer).toHaveBeenCalled();
    });
  });
});
