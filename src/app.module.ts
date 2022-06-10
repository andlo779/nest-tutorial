import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestResponseLoggerMiddleware } from './middleware/request-response-logger.middleware';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:password@localhost:28017/nest?authSource=admin',
    ),
    TodoModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestResponseLoggerMiddleware).forRoutes('*');
  }
}
