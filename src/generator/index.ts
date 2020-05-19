import * as chalk from 'chalk';

interface GlobalOptions {
  BaseUrl?: string;
  Options?: object;
}

interface Instruction {
  Path: string;
  Output: string;
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
    [propName: string]: SubConfiguration;
  };
}

export const generateInstructions = (config: ScraperConfiguration): string => {
  return '';
};
