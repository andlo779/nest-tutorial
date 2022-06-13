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
  async getHealthStatus(): Promise<StatusDto> {
    const numberOfTodos = await this.todoStatisticService.getNumberOfTodos();
    return new StatusDto('Ok', numberOfTodos);
  }

  @Get('absurd')
  @HttpCode(418)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getAbsurd(): void {}
}
