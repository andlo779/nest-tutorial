import { Todo } from '../entities/todo.entity';

export class TodoDto {
  id: string;
  title: string;
  description: string;
  owner: string;
  createdAt: Date;
  dueAt: Date | undefined;

  static fromEntity(entity: Todo): TodoDto {
    const todo = new TodoDto();
    todo.id = entity.id;
    todo.title = entity.title;
    todo.description = entity.description;
    todo.owner = entity.owner;
    todo.createdAt = entity.createdAt;
    todo.dueAt = entity.dueAt;
    return todo;
  }
}
