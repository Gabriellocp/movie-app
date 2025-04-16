import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CurrentUser } from 'src/shared/decorators/CurrentUser.decorator';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { FolderService } from './folder.service';

@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) { }

  @Post()
  create(@CurrentUser() userId: string, @Body() createFolderDto: CreateFolderDto) {
    return this.folderService.create(createFolderDto, userId);
  }

  @Get()
  findAll(@CurrentUser() userId: string) {
    return this.folderService.findAll(userId);
  }

  @Put(':id')
  updateFolder(@CurrentUser() userId: string, @Param('id') id: string, @Body() dto: UpdateFolderDto) {
    return this.folderService.update(id, userId, dto)
  }
}
