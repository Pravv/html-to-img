import { BodyParam, ContentType, JsonController, Post, UseBefore } from 'routing-controllers';
import { browser } from '../initializers/puppeteer';
import { cacheMiddleware } from '../middleware/cache';

interface Size {
  height: number;
  width: number;
}

@JsonController('/convert')
export class Controller {
  @Post('/')
  @ContentType('image/png')
  // @ts-ignore
  @UseBefore(cacheMiddleware(ctx => ctx.request.body.url, 60 * 1000))
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
