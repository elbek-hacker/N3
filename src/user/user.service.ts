import { ConflictException, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from 'src/common/BaseService';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from 'src/enum';
import { CryptoService } from 'src/utils/Crypto';
import { successRes } from 'src/utils/successRes';
import { ISuccess } from 'src/common/response.interface';
import { envConfig } from 'src/config';

@Injectable()
export class UserService
  extends BaseService<CreateUserDto, UpdateUserDto, User>
  implements OnModuleInit
{
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly crypto: CryptoService,
  ) {
    super(userRepo);
  }

  async onModuleInit() {
    const existsSuperAdmin = await this.getRepository.findOne({
      where: { role: Roles.SUPERADMIN },
    });
  
    if (!existsSuperAdmin) {
      const hashedPassword = await this.crypto.hashPassword(envConfig.SUPERADMIN_PASSWORD);
  
      const superadmin = this.getRepository.create({
        username: envConfig.SUPERADMIN_USERNAME,
        password: hashedPassword,
        phoneNumber: envConfig.SUPERADMIN_PHONE_NUMBER,
        role: Roles.SUPERADMIN,
      });
  
      await this.getRepository.save(superadmin);
      console.log('SuperAdmin created!');
    }
  }
  

  async findOne(id: number): Promise<ISuccess> {
    return this.findOneById(id.toString());
  }

  async remove(id: number): Promise<ISuccess> {
    return this.delete(id.toString());
  }

  async createUser(dto: CreateUserDto, role: Roles): Promise<ISuccess> {
    const { username, phoneNumber, password } = dto;

    const existsUsername = await this.getRepository.findOne({
      where: { username },
    });
    if (existsUsername) throw new ConflictException('Username already exists');

    const existsPhone = await this.getRepository.findOne({
      where: { phoneNumber },
    });
    if (existsPhone) throw new ConflictException('Phone number already exists');

    const hashedPassword = await this.crypto.hashPassword(password);
    const user = this.getRepository.create({
      ...dto,
      password: hashedPassword,
      role,
    });

    await this.getRepository.save(user);
    return successRes(user, 201);
  }
}
