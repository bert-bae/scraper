import * as chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';

import { generateInstructions } from './instruction-generator';

import {
  Resource,
  ScraperConfiguration,
  ScraperQueue,
} from '../../typings/types';

const __dirname = path.resolve();

const generateCallback = (name: string, resource: Resource) => {
  return (err: object, res: any, done: any): void => {
    if (err) {
      console.error(chalk.red(err));
    } else {
      const $ = res.$;
      const result = generateInstructions($, resource.Instructions, []);

      if (resource.Output) {
        fs.mkdirSync(`${__dirname}/output`, { recursive: true });
        fs.writeFile(
          `${__dirname}/output/${name}.json`,
          JSON.stringify(result, null, 2),
          function (err) {
            if (err) {
              console.error(err);
            } else {
              console.log(`Result output to file ${resource.Output}`);
            }
          }
        );
        console.log(
          chalk.yellow(
            `[======Resource ${name} file output to ${name}.json======]`
          )
        );
      } else {
        console.log(chalk.yellow(`[======Resource ${name} processed======]`));
        console.log(JSON.stringify(result, null, 2));
      }

      done();
    }
  };
};

export const generateQueue = (config: ScraperConfiguration): ScraperQueue[] => {
  const baseUrl = config.Global.BaseUrl;
  const globalOptions = config.Global.Options;
  const result = [];

  for (let i in config.Resources) {
    const resource = config.Resources[i];
    const queue = {
      ...globalOptions,
      ...resource.Options,
      uri: baseUrl ? `${baseUrl}${resource.Path}` : resource.Url,
      callback: generateCallback(i, resource),
    };

    console.log(chalk.magenta(`[Generate resource queue '${i}' successfully]`));

    result.push(queue);
  }
  return result;
};
