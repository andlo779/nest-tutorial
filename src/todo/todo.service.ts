import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoDto } from './dto/todo.dto';

@Injectable()
export class TodoService {
  private todoStore = new Map<string, Todo>();

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
    const todo = this.todoStore.get(id);
    if (!todo) {
      throw new HttpException(
        `No Todo with id: ${id} exisit`,
        HttpStatus.NOT_FOUND,
      );
    }
    return TodoDto.fromEntity(todo);
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: string) {
    if (!this.todoStore.delete(id)) {
      throw new HttpException(
        `No Todo with id: ${id} exisit`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  numberOfTodos(): number {
    return this.todoStore.size;
  }
}
