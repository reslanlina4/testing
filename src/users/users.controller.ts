import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto:CreateUserDto){
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(){
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param('id') id:string){
    return this.usersService.findOne(+id)
  }

  @Patch()
  update(@Param('id') id:string ,updateUserDto:UpdateUserDto){
   return this.usersService.update(+id,updateUserDto)

  }

  @Delete()
  delete(@Param('id') id:string){
    return this.usersService.remove(+id)
  }

}

