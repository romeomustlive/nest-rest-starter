import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Roles } from 'src/authorization/decorators/roles.decorator';
import { CreateUserDto } from '../dto/create-user.dto';
import { SessionAuthenticationGuard } from 'src/authentication/guards/session-authentication.guard';
import { RolesGuard } from 'src/authorization/guards/roles.guard';
import { RolesEnum } from '../constants/user.constants';
import { PaginatedListQueryDto } from 'src/common/dto/paginated-list-query.dto';

@UseGuards(RolesGuard)
@UseGuards(SessionAuthenticationGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Roles([RolesEnum.Admin])
  @Get()
  async getAll(@Query() query: PaginatedListQueryDto) {
    return await this.userService.getAll(query);
  }

  @Roles([RolesEnum.Admin])
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.userService.getOne(id);
  }

  @Roles([RolesEnum.Admin])
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
  }

  @Roles([RolesEnum.Admin])
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.update(id, updateUserDto);
  }

  @Roles([RolesEnum.Admin])
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
  }
}
