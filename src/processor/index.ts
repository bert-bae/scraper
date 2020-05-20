import * as chalk from 'chalk';
import * as shortId from 'shortid';

import {
  Instruction,
  ScraperConfiguration,
  ScraperQueue,
} from '../../typings/types';

const generateCallback = (instructions: Instruction[]) => {
  return (err: object, res: any, done: any): void => {
    if (err) {
      console.error(chalk.red(err));
    } else {
      const result: { [propName: string]: any } = {
        id: shortId.generate(),
      };
      const $ = res.$;

      // result.test = $.html();
      instructions.forEach((set) => {
        result[set.Output] = $(set.Path)[set.Operation]();
      });

      console.log(result);

      done();
    }
  };
};

export const generateQueue = (
  crawler: Function,
  config: ScraperConfiguration
): ScraperQueue[] => {
  const baseUrl = config.Global.BaseUrl;
  const globalOptions = config.Global.Options;
  const result = [];

  for (let i in config.Resources) {
    const resource = config.Resources[i];
    const queue = {
      ...globalOptions,
      ...resource.Options,
      uri: baseUrl ? `${baseUrl}${resource.Path}` : resource.Url,
      callback: generateCallback(resource.Instructions),
    };

    console.log(chalk.magenta(`[Generate resource queue '${i}' successfully]`));

    result.push(queue);
  }
  return result;
};
