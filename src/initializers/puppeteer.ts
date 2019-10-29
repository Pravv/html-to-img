import * as puppeteer from 'puppeteer';

// eslint-disable-next-line import/no-mutable-exports
export let browser;

export async function initializePuppeter() {
  browser = await puppeteer.launch({ headless: true });
}
