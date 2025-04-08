import { Body, Controller, Get, Post } from '@nestjs/common';
import { CurrentUser } from 'src/shared/decorators/CurrentUser.decorator';
import { CreateFolderDto } from './dto/create-folder.dto';
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
}
