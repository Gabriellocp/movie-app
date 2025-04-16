import { ConflictException, Injectable } from '@nestjs/common';
import { FolderRepository } from 'src/shared/database/repositories/folder.repository';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Injectable()
export class FolderService {
  constructor(private readonly repo: FolderRepository) { }
  private async isValidFolder(name: string, userId: string) {
    const existing = await this.repo.findFolder({ where: { name, userId } })
    if (existing) {
      throw new ConflictException('User already has this folder, please change its name')
    }
  }
  async create(createFolderDto: CreateFolderDto, userId: string) {
    const { name } = createFolderDto
    await this.isValidFolder(name, userId)
    return await this.repo.create(createFolderDto, userId)
  }

  findAll(userId: string) {
    return this.repo.findByUser(userId)
  }

  findOne(id: string) {
    return this.repo.findById(id)
  }

  async update(id: string, userId: string, dto: UpdateFolderDto) {
    const { name } = dto
    await this.isValidFolder(name, userId)

    return await this.repo.update(id, dto)
  }

  // remove(id: number) {
  //   return `This action removes a #${id} folder`;
  // }
}
