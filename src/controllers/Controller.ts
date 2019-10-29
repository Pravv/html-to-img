import { BodyParam, ContentType, JsonController, Post, UseBefore } from 'routing-controllers';
import { browser } from '../initializers/puppeteer';
import { cacheMiddleware } from '../middleware/cache';
import { rateLimiter } from '../middleware/rateLimiter';

interface Size {
  height: number;
  width: number;
}

const limiter = rateLimiter('convert', 10, 60, 'convert-slow-down');
// @ts-ignore
const cache = cacheMiddleware(ctx => ctx.request.body.url, 60 * 1000);

@JsonController('/convert')
export class Controller {
  @Post('/')
  @ContentType('image/png')
  @UseBefore(limiter, cache)
  async convert(
    @BodyParam('url') url: string,
    @BodyParam('omitBackground') omitBackground: boolean,
    @BodyParam('size') imageSize: Size,
  ) {
    const page = await browser.newPage();
    await page.setViewport(imageSize);
    await page.goto(url);

    const screenshot = await page.screenshot({ omitBackground });
    await page.close();

    return screenshot;
  }
}
