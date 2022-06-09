import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoStatisticService } from './todoStatistic.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService, TodoStatisticService],
  exports: [TodoService],
})
export class TodoModule {}
