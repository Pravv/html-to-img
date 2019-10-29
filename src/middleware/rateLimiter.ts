import * as koa from 'koa';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { TooManyRequestsError } from '../lib/TooManyRequestsError';

export function rateLimiter(keyPrefix: string, points: number, duration: number, message: string) {
  const limiter = new RateLimiterMemory({ keyPrefix, points, duration });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (ctx: koa.Context, next: () => Promise<any>): Promise<any> => {
    if (process.env.APP_ENVIRONMENT !== 'production') return next();

    await limiter.consume(ctx.ip).catch(() => {
      throw new TooManyRequestsError(message);
    });

    return next();
  };
}
