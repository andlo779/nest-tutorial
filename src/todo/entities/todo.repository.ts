import { Todo } from './todo.entity';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TodoRepository {
  private _logger = new Logger(TodoRepository.name);
  private _todoStore = new Map<string, Todo>();

  async getAll(): Promise<Todo[]> {
    return Promise.resolve(Array.from(this._todoStore.values()));
  }

  async getOne(uuid: string): Promise<Todo> {
    return Promise.resolve(this._todoStore.get(uuid));
  }

  async save(todo: Todo): Promise<Todo> {
    this._todoStore.set(todo.uuid, todo);
    return Promise.resolve(todo);
  }

  async update(todo: Todo): Promise<Todo> {
    this._todoStore.set(todo.uuid, todo);
    return Promise.resolve(todo);
  }

  async delete(uuid: string): Promise<boolean> {
    if (!this._todoStore.delete(uuid)) {
      this._logger.log(
        `Failed to delete an 'Todo' entity with id: ${uuid} as it was not found.`,
      );
      return false;
    }
    return true;
  }

  async count(): Promise<number> {
    return Promise.resolve(this._todoStore.size);
  }
}
