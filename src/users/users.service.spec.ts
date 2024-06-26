import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { create } from 'domain';
import { dot } from 'node:test/reporters';

describe('UsersService', () => {
  let service: UsersService;
  const mocUserRepository={
    create: jest.fn().mockImplementation(dto=>dto),
    save: jest.fn().mockImplementation(user => Promise.resolve({
      id:Date.now(),
      ...user
    }))


  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,{
        provide:getRepositoryToken(User),
        useValue:mocUserRepository
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user record and return that', async() => {
    expect( await service.create({name:"lina"})).toEqual({
      id:expect.any(Number),
      name:"lina"
    });
  });
});
