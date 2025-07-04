import { Module } from '@nestjs/common';
import { JoinService,Join2Service,Join3Service,User3Service,UserService } from './user.service';
import { JoinController,Join2Controller,Join3Controller,User3Controller,UserController } from './user.controller';
import { DrizzleModule } from 'src/db';

@Module({
  imports: [DrizzleModule],
  providers: [JoinService,Join2Service,Join3Service,User3Service,UserService],
  controllers: [JoinController,Join2Controller,Join3Controller,User3Controller,UserController]
})
export class UserModule {}
