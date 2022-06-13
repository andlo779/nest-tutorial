import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateOwnerTodoDto } from './dto/update-owner-todo.dto';
import { TodoDto } from './dto/todo.dto';
import { UpdateDescriptionTodoDto } from './dto/update-description-todo.dto';
import { UpdateDueDateTodoDto } from './dto/update-due-date-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createTodoDto: CreateTodoDto): Promise<TodoDto> {
    return await this.todoService.create(createTodoDto);
  }

  @Get()
  async findAll(): Promise<TodoDto[]> {
    return await this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id/owner')
  async updateOwner(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOwnerTodoDto: UpdateOwnerTodoDto,
  ) {
    return await this.todoService.updateOwner(id, updateOwnerTodoDto);
  }

  @Patch(':id/description')
  async updateDescription(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDescriptionTodoDto: UpdateDescriptionTodoDto,
  ) {
    return await this.todoService.updateDescription(
      id,
      updateDescriptionTodoDto,
    );
  }

  @Patch(':id/due-date')
  async updateDueDate(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDueDateTodoDto: UpdateDueDateTodoDto,
  ) {
    return await this.todoService.updateDueDate(id, updateDueDateTodoDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.todoService.remove(id);
  }
}
