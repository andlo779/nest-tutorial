import { Todo } from './todo.entity';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Db } from 'mongodb';
import { DATABASE_COLLECTION_TODO, MONGO_CLIENT } from '../../constants';

@Injectable()
export class TodoRepository {
  private _logger = new Logger(TodoRepository.name);
  private _mongoCollection;

  constructor(@Inject(MONGO_CLIENT) db: Db) {
    this._mongoCollection = db.collection(DATABASE_COLLECTION_TODO);
  }

  async getAll(): Promise<Todo[]> {
    return await this._mongoCollection.find().toArray();
  }

  async getOne(uuid: string): Promise<Todo> {
    const result = await this._mongoCollection.findOne({ uuid: uuid });
    if (!result) {
      this.throwNotFoundException(uuid);
    }
    return result;
  }

  async insert(todo: Todo) {
    return await this._mongoCollection.insertOne(todo);
  }

  async update(todo: Todo): Promise<Todo> {
    const result = await this._mongoCollection.findOneAndReplace(
      { uuid: todo.uuid },
      todo,
    );
    if (result.lastErrorObject.n < 1) {
      this.throwNotFoundException(todo.uuid);
    }
    console.log(result);
    return todo;
  }

  async delete(uuid: string): Promise<void> {
    const result = await this._mongoCollection.findOneAndDelete({
      uuid: uuid,
    });
    if (result.lastErrorObject.n < 1) {
      this.throwNotFoundException(uuid);
    }
    console.log(result);
  }

  private throwNotFoundException(uuid: string) {
    this._logger.log(
      `Failed to delete an 'Todo' entity with id: ${uuid} as it was not found.`,
    );
    throw new NotFoundException();
  }

  async count(): Promise<number> {
    return await this._mongoCollection.countDocuments();
  }
}
