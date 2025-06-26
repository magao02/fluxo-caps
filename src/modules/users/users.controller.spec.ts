import { UUID, randomUUID } from 'crypto';

import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { omit } from 'lodash';

import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { CacheUsersRepository } from './repositories/users-cache.repository';
import { UsersRepository } from './repositories/users.repository';
import {
  CreateUserUsecase,
  RemoveUserUsecase,
  RetrieveUserUsecase,
  RetrieveUsersUsecase,
  UpdateUserUsecase,
} from './usecases/usecases';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;

  const mockUsers: Record<UUID, User> = {
    '123e4567-e89b-12d3-a456-426614174000': {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'John Doe',
      age: 20,
      email: 'john.doe@example.com',
      isDeleted: false,
    },
    '123e4567-e89b-12d3-a456-426614174001': {
      id: '123e4567-e89b-12d3-a456-426614174001',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      isDeleted: false,
      age: 25,
    },
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [UsersController],
      providers: [
        UsersService,
        CreateUserUsecase,
        RetrieveUsersUsecase,
        RetrieveUserUsecase,
        UpdateUserUsecase,
        RemoveUserUsecase,
        {
          provide: UsersRepository,
          useValue: new CacheUsersRepository(mockUsers),
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    usersController = moduleRef.get(UsersController);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const expectedResponse = Object.values(mockUsers).map((user) => user);

      const response = await usersController.findAll();
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('findOne', () => {
    it('should return a user object', async () => {
      const expectedResponse = Object.entries(mockUsers)[0][1];

      const response = await usersController.findOne(expectedResponse.id);
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('create', () => {
    it('should return a user object', async () => {
      const expectedResponse = Object.entries(mockUsers)[0][1];

      const response = await usersController.create(expectedResponse);

      expect(omit(response, 'id')).toEqual(omit(expectedResponse, 'id'));
    });

    it('should return a user object with a different id when the user send an id in the body', async () => {
      const expectedResponse = Object.entries(mockUsers)[0][1];
      const newUserMock = { ...expectedResponse, id: randomUUID() };
      const userMockDto = plainToInstance(CreateUserDto, newUserMock);

      const response = await usersController.create(userMockDto);

      expect(response.id).not.toEqual(newUserMock.id);
      expect(response.name).toEqual(newUserMock.name);
    });

    it('should return a user object with isDeleted false when i submit a body with a isDeleted = true', async () => {
      const expectedResponse = Object.entries(mockUsers)[0][1];
      const newUserMock = {
        ...expectedResponse,
        id: randomUUID(),
        isDeleted: true,
      };
      const userMockDto = plainToInstance(CreateUserDto, newUserMock);

      const response = await usersController.create(userMockDto);

      expect(response.isDeleted).toEqual(false);
    });
  });

  describe('update', () => {
    it('should return a user object with the updated information', async () => {
      const expectedResponse = Object.entries(mockUsers)[0][1];
      const newUserMock = { ...expectedResponse, name: 'John Doe Updated' };

      const response = await usersController.update(
        newUserMock.id,
        newUserMock,
      );

      expect(response.name).toEqual(newUserMock.name);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const userToRemove = Object.entries(mockUsers)[0][1];

      const response = await usersController.remove(userToRemove.id);
      expect(response).toEqual(undefined);

      await expect(usersController.findOne(userToRemove.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
