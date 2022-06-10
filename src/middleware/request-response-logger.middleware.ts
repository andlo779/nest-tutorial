import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestResponseLoggerMiddleware implements NestMiddleware {
  private _logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;

      this._logger.log(
        `Route: ${method} ${originalUrl} - Response Status: ${statusCode} - User Agent: ${userAgent} - Client IP: ${ip}`,
      );
    });

    next();
  }
}
