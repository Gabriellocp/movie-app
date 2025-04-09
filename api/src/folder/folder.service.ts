import { Injectable } from '@nestjs/common';
import { FolderRepository } from 'src/shared/database/repositories/folder.repository';
import { CreateFolderDto } from './dto/create-folder.dto';

@Injectable()
export class FolderService {
  constructor(private readonly repo: FolderRepository) { }
  create(createFolderDto: CreateFolderDto, userId: string) {
    return this.repo.create(createFolderDto, userId)
  }

  findAll(userId: string) {
    return this.repo.findByUser(userId)
  }

  findOne(id: string) {
    return this.repo.findById(id)
  }

  // update(id: number, updateFolderDto: UpdateFolderDto) {
  //   return `This action updates a #${id} folder`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} folder`;
  // }
}
