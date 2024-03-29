import { Injectable, Logger } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateOwnerTodoDto } from './dto/update-owner-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoDto } from './dto/todo.dto';
import { UpdateDescriptionTodoDto } from './dto/update-description-todo.dto';
import { UpdateDueDateTodoDto } from './dto/update-due-date-todo.dto';
import { TodoRepository } from './entities/todo.repository';

@Injectable()
export class TodoService {
  private _logger;

  constructor(private readonly todoRepository: TodoRepository) {
    this._logger = new Logger(TodoService.name);
  }

  async create(createTodoDto: CreateTodoDto): Promise<TodoDto> {
    const todo: Todo = new Todo(
      createTodoDto.title,
      createTodoDto.description,
      createTodoDto.owner,
    );
    await this.todoRepository.insert(todo);
    return TodoDto.fromEntity(todo);
  }

  async findAll(): Promise<TodoDto[]> {
    const todos: TodoDto[] = [];
    const result = await this.todoRepository.getAll();
    result.forEach((todo) => todos.push(TodoDto.fromEntity(todo)));
    return todos;
  }

  async findOne(uuid: string): Promise<TodoDto> {
    const todo = await this.todoRepository.getOne(uuid);
    return TodoDto.fromEntity(todo);
  }

  async updateOwner(
    uuid: string,
    updateOwnerTodoDto: UpdateOwnerTodoDto,
  ): Promise<TodoDto> {
    const todo = await this.todoRepository.getOne(uuid);
    todo.owner = updateOwnerTodoDto.owner;
    return TodoDto.fromEntity(await this.todoRepository.update(todo));
  }

  async updateDescription(
    uuid: string,
    updateDescriptionTodoDto: UpdateDescriptionTodoDto,
  ): Promise<TodoDto> {
    const todo = await this.todoRepository.getOne(uuid);
    todo.description = updateDescriptionTodoDto.description;
    return TodoDto.fromEntity(await this.todoRepository.update(todo));
  }

  async updateDueDate(
    uuid: string,
    updateDueDateTodoDto: UpdateDueDateTodoDto,
  ): Promise<TodoDto> {
    const todo = await this.todoRepository.getOne(uuid);
    todo.dueAt = updateDueDateTodoDto.dueAt;
    return TodoDto.fromEntity(await this.todoRepository.update(todo));
  }

  async remove(uuid: string) {
    await this.todoRepository.delete(uuid);
  }
}
