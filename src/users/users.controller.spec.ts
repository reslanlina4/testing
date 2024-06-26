import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { create } from 'domain';
import { dot } from 'node:test/reporters';

describe('UsersController', () => {
  let controller: UsersController;
  const mocUsersService ={
    create: jest.fn(dot => {
      return {
        id:Date.now(),
        ...dot
      }
    }),
    update:jest.fn().mockImplementation((id,dto)=>{
      return{
        id,
        ...dto
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).overrideProvider(UsersService).useValue(mocUsersService).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    const dto = {name:"lina"}
    expect(controller.create({name:"lina"})).toEqual({
      id:expect.any(Number),
      name:dto.name
    });
    
  expect(mocUsersService.create).toHaveBeenCalledWith(dto);
  });

  it('should update a user', () => {
    const dto = {name:"lina"}
    expect(controller.update('1',dto)).toEqual({
      id:1,
      ...dto
    });
    
  expect(mocUsersService.update).toHaveBeenCalled();
  });

});
