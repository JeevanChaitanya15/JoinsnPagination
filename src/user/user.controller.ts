import { Controller,Get,Param,Post,Put,Body,Query } from '@nestjs/common';
import { JoinService,Join2Service,Join3Service,User3Service,UserService } from './user.service';

@Controller('join')
export class JoinController {
  constructor(private readonly joinService: JoinService) {}

  @Get('setup')
  insertData() {
    return this.joinService.insertSampleData();
  }

  @Get('inner')
  innerJoin() {
    return this.joinService.innerJoin();
  }

  @Get('left')
  leftJoin() {
    return this.joinService.leftJoin();
  }

  @Get('right')
  rightJoin() {
    return this.joinService.rightJoin();
  }

  @Get('full')
  fullOuterJoin() {
    return this.joinService.fullOuterJoin();
  }

  @Get('cross')
  crossJoin() {
    return this.joinService.crossJoin();
  }

  @Get('self')
  selfJoin() {
    return this.joinService.selfJoin();
  }

  @Get('natural-join')
  getNaturalJoinQuery() {
    return this.joinService.naturalJoin(); // Raw SQL version
  }
}

@Controller('joins')
export class Join2Controller {
  constructor(private readonly joinService: Join2Service) {}

  @Get('insert')
  insert() {
    return this.joinService.insertSampleData();
  }

  @Get('inner')
  inner() {
    return this.joinService.innerJoin();
  }

  @Get('left')
  left() {
    return this.joinService.leftJoin();
  }

  @Get('right')
  right() {
    return this.joinService.rightJoin();
  }

  @Get('full')
  full() {
    return this.joinService.fullOuterJoin();
  }

  @Get('cross')
  cross() {
    return this.joinService.crossJoin();
  }

  @Get('self')
  selfJoin() {
    return this.joinService.selfJoin(); // raw SQL
  }

  @Get('natural')
  naturalJoin() {
    return this.joinService.naturalJoin(); // raw SQL
  }
}

@Controller('joined')
export class Join3Controller {
  constructor(private readonly joinService: Join3Service) {}

  @Get('insert')
  insert() {
    return this.joinService.insertSampleData();
  }

  @Get('inner')
  inner() {
    return this.joinService.innerJoin();
  }

  @Get('left')
  left() {
    return this.joinService.leftJoin();
  }

  @Get('right')
  right() {
    return this.joinService.rightJoin();
  }

  @Get('full')
  full() {
    return this.joinService.fullOuterJoin();
  }

  @Get('cross')
  cross() {
    return this.joinService.crossJoin();
  }

  @Get('self')
  self() {
    return this.joinService.selfJoin();
  }

  @Get('natural')
  natural() {
    return this.joinService.naturalJoin();
  }
}

@Controller('selfjoin')
export class User3Controller {
  constructor(private readonly userservice: User3Service  ) {}

  @Post('/info')
  async createuserss(@Body() q:{empid: number, names: string , mngid:number}) {
    return await this.userservice.createusers(q);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() b:{empid: number, names: string , mngid:number} ) {
    return this.userservice.update(+id, b);
  }

  @Get('self')
  selfJoin() {
    return this.userservice.selfJoin();
  }
}

//pagination
@Controller('user1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: { name: string; email: string }) {
    return this.userService.createUser(body);
  }

  @Get('paginate')
  async getPaginatedUsers(@Query('page') page: string,@Query('limit') limit: string) {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;

    return this.userService.paginateUsers(pageNum, limitNum);
  }
}
