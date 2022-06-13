import { Injectable } from '@nestjs/common';
import { TodoRepository } from './entities/todo.repository';

@Injectable()
export class TodoStatisticService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async getNumberOfTodos(): Promise<number> {
    return await this.todoRepository.count();
  }
}
