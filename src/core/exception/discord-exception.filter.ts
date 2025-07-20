import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { sendDiscordLog } from './discord-logger';

@Catch()
export class DiscordExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DiscordExceptionFilter.name);

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 500;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    // Log error using NestJS Logger
    this.logger.error(
      `Status: ${status} Error: ${message} Path: ${request.url}`,
      (exception as any)?.stack,
    );

    // Send error log to Discord
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (webhookUrl) {
      await sendDiscordLog(
        webhookUrl,
        `**Error:** ${message}\n**Status:** ${status}\n**Path:** ${request.url}\n\`\`\`${(exception as any)?.stack}\`\`\``,
      );
    }

    response.status(status).json({
      statusCode: status,
      message,
      path: request.url,
    });
  }
}
