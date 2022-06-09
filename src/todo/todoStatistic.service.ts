import { Injectable } from '@nestjs/common';
import { TodoService } from './todo.service';

@Injectable()
export class TodoStatisticService {
  constructor(private readonly todoService: TodoService) {}

  getNumberOfTodos(): number {
    return this.todoService.numberOfTodos();
  }
}
