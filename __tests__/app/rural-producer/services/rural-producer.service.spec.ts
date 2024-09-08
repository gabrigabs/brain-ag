import { RuralProducerService } from '../../../../src/app/rural-producer/services/rural-producer.service';
import { RuralProducerRepository } from '../../../../src/app/rural-producer/repositories/rural-producer.repository';
import { PrismaService } from '../../../../src/app/prisma/services/prisma.service';
import { HttpException, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  ruralProducerRequestInvalidAreaMock,
  ruralProducerRequestInvalidCpfMock,
  ruralProducerRequestMock,
  ruralProducerResponseMock,
} from '../mocks/rural-producer.mocks';
import { randomUUID } from 'crypto';
import { RuralProducerModule } from '../../../../src/app/rural-producer/rural-producer.module';

describe('RuralProducerService', () => {
  let ruralProducerService: RuralProducerService;
  let ruralProducerRepository: RuralProducerRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [RuralProducerModule],
      providers: [PrismaService, RuralProducerRepository, RuralProducerService],
    }).compile();

    ruralProducerRepository = moduleRef.get<RuralProducerRepository>(
      RuralProducerRepository,
    );
    ruralProducerService =
      moduleRef.get<RuralProducerService>(RuralProducerService);

    Logger.prototype.log = jest.fn();
    Logger.prototype.warn = jest.fn();

    jest.clearAllMocks();
  });

  describe('registerProducer', () => {
    it('should register a rural producer with valid cpf successfully', async () => {
      jest
        .spyOn(ruralProducerRepository, 'addRuralProducer')
        .mockResolvedValue(ruralProducerResponseMock);

      const response = await ruralProducerService.registerProducer(
        ruralProducerRequestMock,
      );

      expect(Logger.prototype.log).toHaveBeenCalledWith(
        'Tryng to register a new producer on repository',
      );
      expect(ruralProducerRepository.addRuralProducer).toHaveBeenCalledWith(
        ruralProducerRequestMock,
      );
      expect(response).toEqual(ruralProducerResponseMock);
    });

    it('should register a rural producer with valid cnpj successfully', async () => {
      jest
        .spyOn(ruralProducerRepository, 'addRuralProducer')
        .mockResolvedValue({
          ...ruralProducerResponseMock,
          cpfOrCnpj: '87.196.972/0001-81',
        });

      const response = await ruralProducerService.registerProducer({
        ...ruralProducerRequestMock,
        cpfOrCnpj: '87196972000181',
      });

      expect(Logger.prototype.log).toHaveBeenCalledWith(
        'Tryng to register a new producer on repository',
      );
      expect(ruralProducerRepository.addRuralProducer).toHaveBeenCalledWith({
        ...ruralProducerRequestMock,
        cpfOrCnpj: '87.196.972/0001-81',
      });
      expect(response).toEqual({
        ...ruralProducerResponseMock,
        cpfOrCnpj: '87.196.972/0001-81',
      });
    });

    it('should throw error when try to register a ruralProducer with invalid Cpf', async () => {
      ruralProducerRepository.addRuralProducer = jest.fn();
      await expect(
        ruralProducerService.registerProducer(
          ruralProducerRequestInvalidCpfMock,
        ),
      ).rejects.toThrow(HttpException);

      expect(ruralProducerRepository.addRuralProducer).not.toHaveBeenCalled();
      expect(Logger.prototype.warn).toHaveBeenCalledWith(
        'Failed to validate producer - invalid Cpf or Cnpj',
      );
    });

    it('should throw error when try to register a ruralProducer with invalid farm areas', async () => {
      ruralProducerRepository.addRuralProducer = jest.fn();
      await expect(
        ruralProducerService.registerProducer(
          ruralProducerRequestInvalidAreaMock,
        ),
      ).rejects.toThrow(HttpException);
      expect(ruralProducerRepository.addRuralProducer).not.toHaveBeenCalled();
      expect(Logger.prototype.warn).toHaveBeenCalledWith(
        'Failed to validate producer - Invalid farm area',
      );
    });
  });

  describe('getAllProducers', () => {
    it('should return all rural producers', async () => {
      jest
        .spyOn(ruralProducerRepository, 'findAllRuralProducers')
        .mockResolvedValue([ruralProducerResponseMock]);

      const response = await ruralProducerService.getAllProducers();

      expect(Logger.prototype.log).toHaveBeenCalledWith(
        'Getting all producers from repository',
      );
      expect(ruralProducerRepository.findAllRuralProducers).toHaveBeenCalled();
      expect(response).toEqual([ruralProducerResponseMock]);
    });
  });

  describe('getProducerById', () => {
    it('should return a rural producer by id', async () => {
      jest
        .spyOn(ruralProducerRepository, 'findOneRuralProducer')
        .mockResolvedValue(ruralProducerResponseMock);

      const uuid = randomUUID();

      const response = await ruralProducerService.getProducerById(uuid);

      expect(Logger.prototype.log).toHaveBeenCalledWith(
        `Getting producer by id from repository - id: ${uuid}`,
      );
      expect(ruralProducerRepository.findOneRuralProducer).toHaveBeenCalledWith(
        uuid,
      );
      expect(response).toEqual(ruralProducerResponseMock);
    });

    it('should throw error when try to get a producer by id', async () => {
      ruralProducerRepository.findOneRuralProducer = jest.fn();

      const id = randomUUID();
      await expect(ruralProducerService.getProducerById(id)).rejects.toThrow(
        HttpException,
      );

      expect(ruralProducerRepository.findOneRuralProducer).toHaveBeenCalledWith(
        id,
      );
      expect(Logger.prototype.warn).toHaveBeenCalledWith(
        `Failed to get producer - producer not found - id: ${id}`,
      );
    });
  });

  describe('updateProducerInfo', () => {
    it('should update producer info', async () => {
      ruralProducerService.getProducerById = jest.fn();
      const id = randomUUID();
      jest
        .spyOn(ruralProducerRepository, 'updateOneRuralProducer')
        .mockResolvedValue(ruralProducerResponseMock);

      const response = await ruralProducerService.updateProducerInfo(
        id,
        ruralProducerRequestMock,
      );

      expect(Logger.prototype.log).toHaveBeenCalledWith(
        `Requesting to update producer info - id: ${id}`,
      );
      expect(
        ruralProducerRepository.updateOneRuralProducer,
      ).toHaveBeenCalledWith(id, ruralProducerRequestMock);
      expect(ruralProducerService.getProducerById).toHaveBeenCalledWith(id);
      expect(response).toEqual(ruralProducerResponseMock);
    });
  });

  describe('deleteProducer', () => {
    it('should delete producer', async () => {
      ruralProducerService.getProducerById = jest.fn();
      const id = randomUUID();
      jest
        .spyOn(ruralProducerRepository, 'removeOneRuralProducer')
        .mockResolvedValue(undefined);

      await ruralProducerService.deleteProducer(id);
      expect(Logger.prototype.log).toHaveBeenCalledWith(
        `Requesting to delete producer by id to repository - id: ${id}`,
      );
      expect(ruralProducerService.getProducerById).toHaveBeenCalledWith(id);
      expect(
        ruralProducerRepository.removeOneRuralProducer,
      ).toHaveBeenCalledWith(id);
    });
  });
});
