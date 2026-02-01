import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CryptoService } from 'src/utils/Crypto';
import { TokenService } from 'src/utils/Token';
import { successRes } from 'src/utils/successRes';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly crypto: CryptoService,
    private readonly token: TokenService,
  ) {}

  async signIn(dto: SignInDto) {
    const { username, password } = dto;
    const user: User | any = await this.userRepo.findOne({
      where: { username },
    });
    const isMatchPass = await this.crypto.comparePasswords(
      password,
      user?.password || '',
    );
    if (!user || !isMatchPass) {
      throw new BadRequestException('Username or password invalid');
    }
    const payload = { id: user.id, role: user.role, isActive: user.isActive };
    const token = await this.token.generate(payload);
    return successRes({ token, user });
  }
}
