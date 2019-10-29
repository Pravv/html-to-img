import * as koa from 'koa';

function createCache() {
  const buffer = new Map();

  return {
    get(key) { return buffer.get(key); },
    set(key, item, ex) {
      buffer.set(key, item);
      setTimeout(() => { buffer.delete(key); }, ex);
    },
  };
}

const cache = createCache();

export function cacheMiddleware(keyFn: (ctx: koa.Context) => string, ex): koa.Middleware {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (ctx: koa.Context, next: () => Promise<any>): Promise<any> => {
    if (process.env.APP_ENVIRONMENT !== 'production') return next();

    const cacheKey = keyFn(ctx);

    const cachedValue = cache.get(cacheKey);
    if (cachedValue) {
      ctx.set('Content-Type', cachedValue.contentType);
      ctx.body = cachedValue.body;
      return;
    }

    await next();

    cache.set(cacheKey, { body: ctx.body, contentType: ctx.response.get('Content-Type') }, ex);
  };
}
