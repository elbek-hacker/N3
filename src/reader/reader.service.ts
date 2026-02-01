import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';
import { UpdateReaderDto } from './dto/update-reader.dto';
import { Roles } from 'src/enum';
import { successRes } from 'src/utils/successRes';

@Injectable()
export class ReaderService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  async getAllBooks() {
    const books = await this.bookRepo.find();
    return successRes(books);
  }

  async getBookById(id: string) {
    const book = await this.bookRepo.findOne({
      where: { id: +id },
    });

    if (!book) throw new NotFoundException('Book not found');
    return successRes(book);
  }

  async getProfile(readerId: number) {
    const reader = await this.userRepo.findOne({
      where: { id: readerId, role: Roles.READER },
      select: ['id', 'username', 'fullName', 'email', 'phoneNumber', 'age'],
    });

    if (!reader) throw new NotFoundException('Reader not found');
    return successRes(reader);
  }

  async updateProfile(readerId: number, dto: UpdateReaderDto) {
    const reader = await this.userRepo.findOne({
      where: { id: readerId, role: Roles.READER },
    });

    if (!reader) throw new NotFoundException('Reader not found');

    Object.assign(reader, dto);
    await this.userRepo.save(reader);

    return successRes(reader);
  }

  async borrowBook(readerId: number, bookId: string) {
    const book = await this.bookRepo.findOne({
      where: { id: +bookId },
    });

    if (!book) throw new NotFoundException('Book not found');
    if (!book.available)
      throw new BadRequestException('Book is not available');

    book.available = false;
    book.borrowedById = readerId; 

    await this.bookRepo.save(book);
    return successRes(book);
  }

  async getMyBooks(readerId: number) {
    const books = await this.bookRepo.find({
      where: { borrowedById: readerId },
    });

    if (!books.length)
      throw new NotFoundException('books not found')

    return successRes(books);
  }

  async returnBook(readerId: number, bookId: string) {
    const book = await this.bookRepo.findOne({
      where: { id: +bookId, borrowedById: readerId },
    });

    if (!book)
      throw new BadRequestException(
        'This book is not borrowed by you',
      );

    book.available = true;
    book.borrowedById = null;

    await this.bookRepo.save(book);
    return successRes(book);
  }
}
