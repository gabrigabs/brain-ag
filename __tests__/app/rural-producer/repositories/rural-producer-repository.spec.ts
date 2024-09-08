import { HttpException, Logger } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { PrismaService } from '../../../../src/app/prisma/services/prisma.service';
import { RuralProducerRepository } from '../../../../src/app/rural-producer/repositories/rural-producer.repository';
import {
  countFarmsByCropsFormatedMock,
  countFarmsByStateFormatedMock,
  farmsByCropsUnformatedMock,
  farmsByStateUnformatedMock,
  farmsTotalAreaFormatedMock,
  farmsTotalAreaUnformatedMock,
  ruralProducerRequestMock,
  ruralProducerResponseMock,
} from '../mocks/rural-producer.mocks';
import { randomUUID } from 'crypto';

describe('RuralProducerRepository', () => {
  let ruralProducerRepository: RuralProducerRepository;
  let prismaService: PrismaService;
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: {
            ruralProducer: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              groupBy: jest.fn(),
              aggregate: jest.fn(),
            },
          },
        },
        RuralProducerRepository,
      ],
    }).compile();

    ruralProducerRepository = moduleRef.get<RuralProducerRepository>(
      RuralProducerRepository,
    );

    prismaService = moduleRef.get<PrismaService>(PrismaService);

    Logger.prototype.log = jest.fn();
    Logger.prototype.error = jest.fn();

    jest.clearAllMocks();
  });

  describe('addRuralProducer', () => {
    it('should add a new rural producer successfully', async () => {
      prismaService.ruralProducer.create = jest
        .fn()
        .mockResolvedValue(ruralProducerResponseMock);

      const response = await ruralProducerRepository.addRuralProducer(
        ruralProducerRequestMock,
      );
      expect(prismaService.ruralProducer.create).toHaveBeenCalledWith({
        data: ruralProducerRequestMock,
      });
      expect(Logger.prototype.log).toHaveBeenCalledWith(
        'Adding a new producer on database',
      );
      expect(response).toEqual(ruralProducerResponseMock);
    });

    it('should throw an error when adding a new rural producer fails', async () => {
      const error = new Error('teste');
      prismaService.ruralProducer.create = jest.fn().mockImplementation(() => {
        throw error;
      });

      await expect(
        ruralProducerRepository.addRuralProducer(ruralProducerRequestMock),
      ).rejects.toThrow(HttpException);

      expect(Logger.prototype.error).toHaveBeenCalledWith(
        `Error when trying to add a new producer on database - ${error}`,
        error.stack,
      );
    });
  });

  describe('findAllRuralProducers', () => {
    it('should get all producers successfully', async () => {
      prismaService.ruralProducer.findMany = jest
        .fn()
        .mockResolvedValue([ruralProducerResponseMock]);

      const response = await ruralProducerRepository.findAllRuralProducers();
      expect(prismaService.ruralProducer.findMany).toHaveBeenCalled();
      expect(Logger.prototype.log).toHaveBeenCalledWith(
        'Getting all producers from database',
      );
      expect(response).toEqual([ruralProducerResponseMock]);
    });

    it('should throw an error when getting all producers fails', async () => {
      const error = new Error('teste');
      prismaService.ruralProducer.findMany = jest
        .fn()
        .mockImplementation(() => {
          throw error;
        });

      await expect(
        ruralProducerRepository.findAllRuralProducers(),
      ).rejects.toThrow(HttpException);

      expect(Logger.prototype.error).toHaveBeenCalledWith(
        `Error when trying to get producers from database - ${error}`,
        error.stack,
      );
    });
  });

  describe('findOneRuralProducer', () => {
    it('should get a producer successfully', async () => {
      const id = randomUUID();
      prismaService.ruralProducer.findUnique = jest
        .fn()
        .mockResolvedValue(ruralProducerResponseMock);

      const response = await ruralProducerRepository.findOneRuralProducer(id);
      expect(prismaService.ruralProducer.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(Logger.prototype.log).toHaveBeenCalledWith(
        `Getting a producer by id from database - id: ${id}`,
      );
      expect(response).toEqual(ruralProducerResponseMock);
    });

    it('should throw an error when getting a producer fails', async () => {
      const id = randomUUID();
      const error = new Error('teste');
      prismaService.ruralProducer.findUnique = jest
        .fn()
        .mockImplementation(() => {
          throw error;
        });

      await expect(
        ruralProducerRepository.findOneRuralProducer(id),
      ).rejects.toThrow(HttpException);

      expect(Logger.prototype.error).toHaveBeenCalledWith(
        `Error when trying to get a producer by id from database - ${error}`,
        error.stack,
      );
      expect(prismaService.ruralProducer.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('updateOneRuralProducer', () => {
    it('should update a producer successfully', async () => {
      const id = randomUUID();
      prismaService.ruralProducer.update = jest
        .fn()
        .mockResolvedValue(ruralProducerResponseMock);

      const response = await ruralProducerRepository.updateOneRuralProducer(
        id,
        ruralProducerRequestMock,
      );

      expect(prismaService.ruralProducer.update).toHaveBeenCalledWith({
        where: { id },
        data: ruralProducerRequestMock,
      });
      expect(Logger.prototype.log).toHaveBeenCalledWith(
        `Updating a producer on database - id: ${id}`,
      );
      expect(response).toEqual(ruralProducerResponseMock);
    });

    it('should throw an error when updating a producer fails', async () => {
      const id = randomUUID();
      const error = new Error('teste');
      prismaService.ruralProducer.update = jest.fn().mockImplementation(() => {
        throw error;
      });

      await expect(
        ruralProducerRepository.updateOneRuralProducer(
          id,
          ruralProducerRequestMock,
        ),
      ).rejects.toThrow(HttpException);

      expect(Logger.prototype.error).toHaveBeenCalledWith(
        `Error when trying to update a producer on database - ${error}`,
        error.stack,
      );
      expect(prismaService.ruralProducer.update).toHaveBeenCalledWith({
        where: { id },
        data: ruralProducerRequestMock,
      });
    });
  });

  describe('removeOneRuralProducer', () => {
    it('should remove a producer successfully', async () => {
      const id = randomUUID();
      prismaService.ruralProducer.delete = jest
        .fn()
        .mockResolvedValue(ruralProducerResponseMock);

      const response = await ruralProducerRepository.removeOneRuralProducer(id);
      expect(prismaService.ruralProducer.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(Logger.prototype.log).toHaveBeenCalledWith(
        `Removing a producer from database - id: ${id}`,
      );
      expect(response).toBeUndefined();
    });

    it('should throw an error when removing a producer fails', async () => {
      const id = randomUUID();
      const error = new Error('teste');
      prismaService.ruralProducer.delete = jest.fn().mockImplementation(() => {
        throw error;
      });

      await expect(
        ruralProducerRepository.removeOneRuralProducer(id),
      ).rejects.toThrow(HttpException);

      expect(Logger.prototype.error).toHaveBeenCalledWith(
        `Error when trying to remove a producer on database - ${error}`,
        error.stack,
      );
      expect(prismaService.ruralProducer.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('countFarmsByState', () => {
    it('should count farms by state successfully', async () => {
      prismaService.ruralProducer.groupBy = jest
        .fn()
        .mockResolvedValue(farmsByStateUnformatedMock);
      const response = await ruralProducerRepository.countFarmsByState();
      expect(prismaService.ruralProducer.groupBy).toHaveBeenCalledWith({
        by: ['state'],
        _count: {
          _all: true,
        },
      });
      expect(Logger.prototype.log).toHaveBeenCalledWith(
        `Getting count of farms by state from database`,
      );
      expect(response).toEqual(countFarmsByStateFormatedMock);
    });

    it('should throw an error when count farms by state fails', async () => {
      const error = new Error('teste');
      prismaService.ruralProducer.groupBy = jest.fn().mockImplementation(() => {
        throw error;
      });
      await expect(ruralProducerRepository.countFarmsByState()).rejects.toThrow(
        HttpException,
      );
      expect(Logger.prototype.error).toHaveBeenCalledWith(
        `Error when trying to get count of farms by state from database - ${error}`,
        error.stack,
      );
      expect(prismaService.ruralProducer.groupBy).toHaveBeenCalledWith({
        by: ['state'],
        _count: {
          _all: true,
        },
      });
    });
  });

  describe('countFarmsByCrops', () => {
    it('should count farms by crops successfully', async () => {
      prismaService.ruralProducer.groupBy = jest
        .fn()
        .mockResolvedValue(farmsByCropsUnformatedMock);
      const response = await ruralProducerRepository.countFarmsByCrops();
      expect(prismaService.ruralProducer.groupBy).toHaveBeenCalledWith({
        by: ['plantedCrops'],
        _count: {
          _all: true,
        },
      });
      expect(Logger.prototype.log).toHaveBeenCalledWith(
        `Getting count of farms by crops from database`,
      );
      expect(response).toEqual(countFarmsByCropsFormatedMock);
    });

    it('should throw an error when count farms by crops fails', async () => {
      const error = new Error('teste');
      prismaService.ruralProducer.groupBy = jest.fn().mockImplementation(() => {
        throw error;
      });
      await expect(ruralProducerRepository.countFarmsByCrops()).rejects.toThrow(
        HttpException,
      );
      expect(Logger.prototype.error).toHaveBeenCalledWith(
        `Error when trying to get count of farms by crops from database - ${error}`,
        error.stack,
      );
      expect(prismaService.ruralProducer.groupBy).toHaveBeenCalledWith({
        by: ['plantedCrops'],
        _count: {
          _all: true,
        },
      });
    });
  });

  describe('countFarmsAreas', () => {
    it('should count farms areas successfully', async () => {
      prismaService.ruralProducer.aggregate = jest
        .fn()
        .mockResolvedValue(farmsTotalAreaUnformatedMock);
      const response = await ruralProducerRepository.countFarmsAreas();
      expect(prismaService.ruralProducer.aggregate).toHaveBeenCalledWith({
        _sum: {
          farmTotalArea: true,
          farmArableArea: true,
          farmVegetationArea: true,
        },
        _count: {
          _all: true,
        },
      });
      expect(Logger.prototype.log).toHaveBeenCalledWith(
        `Getting count of farms areas from database`,
      );
      expect(response).toEqual(farmsTotalAreaFormatedMock);
    });

    it('should throw an error when count farms areas fails', async () => {
      const error = new Error('teste');
      prismaService.ruralProducer.aggregate = jest
        .fn()
        .mockImplementation(() => {
          throw error;
        });
      await expect(ruralProducerRepository.countFarmsAreas()).rejects.toThrow(
        HttpException,
      );
      expect(Logger.prototype.error).toHaveBeenCalledWith(
        `Error when trying to count farms areas from database - ${error}`,
        error.stack,
      );
      expect(prismaService.ruralProducer.aggregate).toHaveBeenCalledWith({
        _sum: {
          farmTotalArea: true,
          farmArableArea: true,
          farmVegetationArea: true,
        },
        _count: {
          _all: true,
        },
      });
    });
  });
});
