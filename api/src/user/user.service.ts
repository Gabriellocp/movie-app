import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { SignUpDto } from 'src/auth/dto/signUp.dto';
import { UserRepository } from 'src/shared/database/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) { }
  async create(dto: SignUpDto) {
    const existing = await this.repo.findByEmail(dto.email)
    if (existing) {
      throw new ConflictException('Invalid credentials')
    }
    const hashPass = await hash(dto.password, 8)
    return await this.repo.create({
      ...dto,
      password: hashPass
    })
  }

  findByEmail(email: string) {
    return this.repo.findByEmail(email)
  }

}
