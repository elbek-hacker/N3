import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReaderService } from './reader.service';
import { ReaderController } from './reader.controller';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';
import { CryptoService } from 'src/utils/Crypto';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Book]),
  ],
  controllers: [ReaderController],
  providers: [ReaderService, CryptoService],
})
export class ReaderModule {}
