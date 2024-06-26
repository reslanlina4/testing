import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from 'src/users/users.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
import { find } from 'rxjs';
import { response } from 'express';
import { error } from 'console';

describe('UserController (e2e)', () => {
    const mocUsers=[{id:1,name:"saly"}]
  let app: INestApplication;
  const mocUsersRepository = {
    find: jest.fn().mockResolvedValue(mocUsers),
    create: jest.fn().mockImplementation(dto=>dto),
    save: jest.fn().mockImplementation(user => Promise.resolve({
      id:Date.now(),
      ...user
    }))

  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).overrideProvider(getRepositoryToken(User)).useValue(mocUsersRepository).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect('Content-type',/json/)
      .expect(mocUsers)
     
  });

  it('/users (POST) --> 400 on validation error', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({name:'bob'})
      .expect('Content-type',/json/)
      .expect(201)
      .then(response => {
        expect(response.body).toEqual({
            id:expect.any(Number),
            name:'bob'
        })
      })
     
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({name:333332222})
      .expect('Content-type',/json/)
      .expect(400)
      .expect({
        statusCode:400,
        message:['name must be a string'],
        error:'Bad Request'
      })
      })
     
  });

