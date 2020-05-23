import * as Crawler from 'crawler';
import * as path from 'path';
import { generateQueue } from './processor';
import { loadAllConfigs } from './config-loader';

import { ScraperConfiguration } from '../typings/types';

const __dirname = path.resolve();

const crawler = new Crawler({
  jQuery: true,
  rateLimit: 1000,
  maxConnections: 10,
});

const configs = loadAllConfigs(`${__dirname}/config`);

const queues = configs.map((i: ScraperConfiguration) => {
  return generateQueue(i);
});

queues.forEach((i) => {
  crawler.queue(i);
});
