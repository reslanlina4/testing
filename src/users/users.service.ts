import { Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository :Repository<User>,
  ){}
  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto)
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find(); //select * from User
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({id});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
  
    const user = await this.findOne(id);
    return this.userRepository.save({...user,...updateUserDto}) ;
  }

 async remove(id: number) {
  const user = await this.userRepository.findOneBy({id});
    return this.userRepository.remove(user);
  }
}
