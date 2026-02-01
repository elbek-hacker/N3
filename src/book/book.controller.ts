import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/role.guard';
import { Roles } from 'src/enum';
import { AccessRoles } from 'src/decorator/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('books')
@UseGuards(AuthGuard, RolesGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @AccessRoles(Roles.LIBRARIAN, Roles.SUPERADMIN)
  create(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bookService.findOne(+id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Patch(':id')
  @AccessRoles(Roles.LIBRARIAN, Roles.SUPERADMIN)
  update(
    @Param('id') id: number,
    @Body() dto: UpdateBookDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.bookService.updateUser(id, dto, file);
  }

  @Delete(':id')
  @AccessRoles(Roles.LIBRARIAN, Roles.SUPERADMIN)
  remove(@Param('id') id: number) {
    return this.bookService.remove(id);
  }
}
