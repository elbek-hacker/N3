import {
  ConflictException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BaseService } from 'src/common/BaseService';
import { CryptoService } from 'src/utils/Crypto';
import { successRes } from 'src/utils/successRes';
import { ISuccess } from 'src/common/response.interface';
import { FileService } from 'src/file/file.service';

@Injectable()
export class BookService
  extends BaseService<CreateBookDto, UpdateBookDto, Book>
  implements OnModuleInit
{
  constructor(
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
    private readonly crypto: CryptoService,
    private readonly fileService: FileService
  ) {
    super(bookRepo);
  }

  async onModuleInit() {
    const defaultBook = await this.bookRepo.findOne({
      where: { title: 'Clean Architecture' },
    });
    if (!defaultBook) {
      const book = this.bookRepo.create({
        title: 'Clean Architecture',
        author: 'Robert C. Martin',
        description: 'Backend arxitektura',
        available: true,
      });
      await this.bookRepo.save(book);
      console.log('Default book created!');
    }
  }

  async create(dto: CreateBookDto): Promise<ISuccess> {
    const { title } = dto;
    const existsTitle = await this.bookRepo.findOne({ where: { title } });
    if (existsTitle)
      throw new ConflictException('Book with this title already exists');

    const book = this.bookRepo.create({ ...dto, available: true });
    await this.bookRepo.save(book);

    return successRes(book, 201);
  }

  async findAll(): Promise<ISuccess> {
    const books = await this.bookRepo.find();
    return successRes(books);
  }

  async findOne(id: number): Promise<ISuccess> {
    const book = await this.bookRepo.findOne({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');
    return successRes(book);
  }

  async update(id: string, dto: UpdateBookDto): Promise<ISuccess> {
    const book = await this.bookRepo.findOne({ where: { id: +id } });
    if (!book) throw new NotFoundException('Book not found');

    if (dto.title && dto.title !== book.title) {
      const existsTitle = await this.bookRepo.findOne({
        where: { title: dto.title },
      });
      if (existsTitle)
        throw new ConflictException('Book with this title already exists');
    }

    Object.assign(book, dto);
    await this.bookRepo.save(book);
    return successRes(book);
  }

  async remove(id: number): Promise<ISuccess> {
    const book = await this.bookRepo.findOne({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');

    await this.bookRepo.remove(book);
    return successRes({});
  }

  async updateUser(id: number, updateBookDto: UpdateBookDto, file: Express.Multer.File){
    const image = await this.fileService.create(file);
    return image;
  }
}
