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
    [propName: string]: SubConfiguration;
  };
}

interface ScraperQueue {
  uri: string;
  callback: Function;
  [propName: string]: any;
}

export {
  GlobalOptions,
  Instruction,
  SubConfiguration,
  ScraperConfiguration,
  ScraperQueue,
};
