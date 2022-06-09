import { Controller, Get, HttpCode } from '@nestjs/common';
import { StatusDto } from './dto/status.dto';
import { TodoStatisticService } from '../todo/todoStatistic.service';

@Controller('health')
export class HealthController {
  constructor(private readonly todoStatisticService: TodoStatisticService) {}

  @Get('ping')
  getHealthPing(): string {
    return 'pong';
  }

  @Get('status')
  getHealthStatus(): StatusDto {
    return new StatusDto('Ok', this.todoStatisticService.getNumberOfTodos());
  }

  @Get('absurd')
  @HttpCode(418)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getAbsurd(): void {}
}
