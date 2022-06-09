import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { TodoModule } from './todo/todo.module';
import { TodoStatisticService } from './todo/todoStatistic.service';

@Module({
  imports: [TodoModule],
  controllers: [HealthController],
  providers: [TodoStatisticService],
})
export class AppModule {}
