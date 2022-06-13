import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoStatisticService } from './todoStatistic.service';
import { TodoRepository } from './entities/todo.repository';
import { MongoModule } from '../mongo-module';

@Module({
  controllers: [TodoController],
  providers: [TodoService, TodoStatisticService, TodoRepository],
  exports: [TodoStatisticService],
  imports: [MongoModule],
})
export class TodoModule {}
