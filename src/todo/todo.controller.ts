import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
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
  create(@Body() createTodoDto: CreateTodoDto): TodoDto {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id/owner')
  updateOwner(
    @Param('id') id: string,
    @Body() updateOwnerTodoDto: UpdateOwnerTodoDto,
  ) {
    return this.todoService.updateOwner(id, updateOwnerTodoDto);
  }

  @Patch(':id/description')
  updateDescription(
    @Param('id') id: string,
    @Body() updateDescriptionTodoDto: UpdateDescriptionTodoDto,
  ) {
    return this.todoService.updateDescription(id, updateDescriptionTodoDto);
  }

  @Patch(':id/due-date')
  updateDueDate(
    @Param('id') id: string,
    @Body() updateDueDateTodoDto: UpdateDueDateTodoDto,
  ) {
    return this.todoService.updateDueDate(id, updateDueDateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
