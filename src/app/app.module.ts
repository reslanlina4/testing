import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [UsersModule,TypeOrmModule.forRoot({
    type:'sqlite',
    database:'db'
  })],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
