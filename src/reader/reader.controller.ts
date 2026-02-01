import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReaderService } from './reader.service';
import { UpdateReaderDto } from './dto/update-reader.dto';
import { Roles } from 'src/enum';
import { AccessRoles } from 'src/decorator/roles.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/role.guard';

@Controller('readers')
@UseGuards(AuthGuard, RolesGuard)
@AccessRoles(Roles.READER)
export class ReaderController {
  constructor(private readonly readerService: ReaderService) {}

  @Get('books')
  getAllBooks() {
    return this.readerService.getAllBooks();
  }

  @Get('books/:id')
  getBook(@Param('id') id: string) {
    return this.readerService.getBookById(id);
  }

  @Get('me')
  getProfile(@Req() req) {
    return this.readerService.getProfile(req.user.id);
  }

  @Patch('me')
  updateProfile(@Req() req, @Body() dto: UpdateReaderDto) {
    return this.readerService.updateProfile(req.user.id, dto);
  }

  @Post('borrow/:bookId')
  borrowBook(@Req() req, @Param('bookId') bookId: string) {
    return this.readerService.borrowBook(req.user.id, bookId);
  }

  @Get('my-books')
  myBooks(@Req() req) {
    return this.readerService.getMyBooks(req.user.id);
  }

  @Post('return/:bookId')
  returnBook(@Req() req, @Param('bookId') bookId: string) {
    return this.readerService.returnBook(req.user.id, bookId);
  }
}
