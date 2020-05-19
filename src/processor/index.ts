import * as chalk from 'chalk';
import * as shortId from 'shortid';

interface GlobalOptions {
  BaseUrl?: string;
  Options?: object;
}

interface Instruction {
  Path: string;
  Output: string;
  Operation: string;
}

interface SubConfiguration {
  Url?: string;
  Path?: string;
  Options?: object;
  Instructions: Instruction[];
}

interface ScraperConfiguration {
  Global?: GlobalOptions;
  Resources: {
    readonly [propName: string]: SubConfiguration;
  };
}

const generateCallback = (crawler: Function, instructions: Instruction[]) => {
  return (err: object, res: any, done: any) => {
    if (err) {
      console.error(chalk.red(err));
    } else {
      const result = {
        id: shortId.generate(),
      };

      instructions.forEach((set) => {
        result[set.Output] = crawler(set.Path)[set.Operation]();
      });

      return result;
    }
  };
};

export const generateQueue = (
  crawler: Function,
  config: ScraperConfiguration
): object[] => {
  const baseUrl = config.Global.BaseUrl;
  const globalOptions = config.Global.Options;
  const result = [];

  for (let i in config.Resources) {
    const resource = config.Resources[i];
    const queue = {
      ...globalOptions,
      ...resource.Options,
      uri: baseUrl ? `${baseUrl}${resource.Path}` : resource.Url,
      callback: generateCallback(crawler, resource.Instructions),
    };

    console.log(chalk.magenta(`[Generate resource queue '${i}' successfully]`));
    console.log(chalk.yellow(JSON.stringify(queue, null, 2)));

    result.push(result);
  }
  return result;
};
