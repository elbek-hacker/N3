import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envConfig } from './config';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { ReaderModule } from './reader/reader.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: envConfig.DB_URL,
      autoLoadEntities: true,
      entities: [User],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), '..', envConfig.FILE_PATH),
      serveRoot: `/api${envConfig.FILE_PATH}`
    }),
    UserModule,
    AuthModule,
    BookModule,
    ReaderModule,
  ],
})
export class AppModule {}
