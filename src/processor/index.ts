import * as chalk from 'chalk';
import * as shortId from 'shortid';
import * as fs from 'fs';
import * as path from 'path';

import {
  Instruction,
  Resource,
  ScraperConfiguration,
  ScraperQueue,
} from '../../typings/types';

const __dirname = path.resolve();

const generateInstructions = (
  crawler: Function,
  instructions: Instruction[]
): object => {
  const result: { [propName: string]: any } = {
    id: shortId.generate(),
  };

  instructions.forEach((set) => {
    const elements = crawler(set.Path);
    const output = [];

    elements.each((i, el) => {
      output.push(crawler(el)[set.Operation]());
    });

    result[set.Output] = output;
  });

  return result;
};

const generateCallback = (name: string, resource: Resource) => {
  return (err: object, res: any, done: any): void => {
    if (err) {
      console.error(chalk.red(err));
    } else {
      const $ = res.$;
      const result = generateInstructions($, resource.Instructions);

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
      }

      console.log(chalk.yellow(`[======Resource ${name} processed======]`));

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
