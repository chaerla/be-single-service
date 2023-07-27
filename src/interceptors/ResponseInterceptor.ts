import { Reflector } from '@nestjs/core';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseMessageKey } from '../decorators/response.decorator';

export interface Response<T> {
  status: string;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const responseMessage =
      this.reflector.get<string>(ResponseMessageKey, context.getHandler()) ??
      '';

    return next.handle().pipe(
      map((data) => ({
        data,
        status: 'success',
        message: responseMessage,
      })),
    );
  }
}
