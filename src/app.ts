import 'reflect-metadata';
import * as Koa from 'koa';
import { initializeRouter } from './initializers/router';
import { initializePuppeter } from './initializers/puppeteer';

function getApplicationPort() {
  return process.env.APP_PORT || 3000;
}

async function initialize() {
  const app = new Koa();
  app.proxy = true;

  await initializeRouter(app);
  await initializePuppeter();

  const port = getApplicationPort();

  const httpServer = app.listen(port);

  console.log('app', `Started, listening on ${port}`);
}

initialize();
