import { Controller, Get, Query, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

@Controller('/api/snippets/')
export class SnippetController {
  constructor(private readonly snippetService: SnippetService) {}

  @Post()
  create(@Body() createSnippetDto: CreateSnippetDto) {
    return this.snippetService.create(createSnippetDto);
  }

  @Get('')
  findAll(
    @Query('q') q?: string,
    @Query('tag') tag?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.snippetService.findAll({ q, tag, page: page ? +page : 1, limit: limit ? +limit : 10 });
  } 

  @Get(':id')
  findOne(@Param('id' ) id: string) {
    return this.snippetService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSnippetDto: UpdateSnippetDto) {
    return this.snippetService.update(id, updateSnippetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.snippetService.remove(id);
  }
}
