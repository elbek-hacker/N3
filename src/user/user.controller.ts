// src/user/user.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { AccessRoles } from 'src/decorator/roles.decorator';
import { Roles } from 'src/enum';
import { RolesGuard } from 'src/guard/role.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
  constructor(private service: UserService) {}

  @Post('librarian')
  @AccessRoles(Roles.SUPERADMIN)
  createLibrarian(@Body() dto: CreateUserDto) {
    return this.service.createUser(dto, Roles.LIBRARIAN);
  }

  @Post('reader')
  @AccessRoles(Roles.SUPERADMIN, Roles.LIBRARIAN)
  createReader(@Body() dto: CreateUserDto) {
    return this.service.createUser(dto, Roles.READER);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @AccessRoles(Roles.SUPERADMIN, Roles.LIBRARIAN)
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @AccessRoles(Roles.SUPERADMIN, Roles.LIBRARIAN)
  update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.service.update(id.toString(), dto);
  }

  @Delete(':id')
  @AccessRoles(Roles.SUPERADMIN, Roles.LIBRARIAN)
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
