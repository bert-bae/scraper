import * as Crawler from 'crawler';
import { generateQueue } from './processor';
import { loadAllConfigs } from './config-loader';

import { ScraperConfiguration } from '../typings/types';

const crawler = new Crawler({
  jQuery: true,
  rateLimit: 1000,
  maxConnections: 10,
});

const configs = loadAllConfigs('../config');

const queues = configs.map((i: ScraperConfiguration) => {
  return generateQueue(crawler, i);
});

queues.forEach((i) => {
  crawler.queue(i);
});
