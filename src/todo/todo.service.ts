import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateOwnerTodoDto } from './dto/update-owner-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoDto } from './dto/todo.dto';
import { UpdateDescriptionTodoDto } from './dto/update-description-todo.dto';
import { UpdateDueDateTodoDto } from './dto/update-due-date-todo.dto';

@Injectable()
export class TodoService {
  private todoStore = new Map<string, Todo>();
  private _logger;

  constructor() {
    this._logger = new Logger();
  }

  private fetchOne(id: string): Todo {
    const todo = this.todoStore.get(id);
    if (!todo) {
      this._logger.warn(`Could not found a 'Todo' with id ${id}`);
      throw new NotFoundException();
    }
    return todo;
  }

  create(createTodoDto: CreateTodoDto): TodoDto {
    const todo: Todo = new Todo(
      createTodoDto.title,
      createTodoDto.description,
      createTodoDto.owner,
    );
    this.todoStore.set(todo.id, todo);
    return TodoDto.fromEntity(todo);
  }

  findAll(): TodoDto[] {
    const todos: TodoDto[] = [];
    this.todoStore.forEach((todo) => todos.push(TodoDto.fromEntity(todo)));
    return todos;
  }

  findOne(id: string): TodoDto {
    const todo = this.fetchOne(id);
    return TodoDto.fromEntity(todo);
  }

  updateOwner(id: string, updateOwnerTodoDto: UpdateOwnerTodoDto): TodoDto {
    const todo = this.fetchOne(id);
    todo.owner = updateOwnerTodoDto.owner;
    this.todoStore.set(todo.id, todo);
    return TodoDto.fromEntity(todo);
  }

  updateDescription(
    id: string,
    updateDescriptionTodoDto: UpdateDescriptionTodoDto,
  ): TodoDto {
    const todo = this.fetchOne(id);
    todo.description = updateDescriptionTodoDto.description;
    this.todoStore.set(todo.id, todo);
    return TodoDto.fromEntity(todo);
  }

  updateDueDate(
    id: string,
    updateDueDateTodoDto: UpdateDueDateTodoDto,
  ): TodoDto {
    const todo = this.fetchOne(id);
    todo.dueAt = updateDueDateTodoDto.dueAt;
    this.todoStore.set(todo.id, todo);
    return TodoDto.fromEntity(todo);
  }

  remove(id: string) {
    if (!this.todoStore.delete(id)) {
      this._logger.warn(
        `Failed to delete an 'Todo' entity with id: ${id} as it was not found.`,
      );
      throw new NotFoundException();
    }
  }

  numberOfTodos(): number {
    return this.todoStore.size;
  }
}
