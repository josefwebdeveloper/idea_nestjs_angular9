import {
  CallHandler,
  ExecutionContext,
  Injectable, Logger, NestInterceptor,

} from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;

    const now = Date.now();
    return next
      .handle()
      .pipe(
        // tap(() => console.log(`After... ${Date.now() - now}ms`)),
        tap(() =>
          Logger.log(`${method} ${url} ${Date.now() - now}ms`,
            context.getClass().name
          )));
  }
}
