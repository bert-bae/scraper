interface GlobalOptions {
  BaseUrl?: string;
  Options?: object;
}

interface Instruction {
  Selector: string;
  Output: string;
  Operation: string | Instruction[];
}

interface Resource {
  Url?: string;
  Path?: string;
  Options?: object;
  Output?: boolean;
  Instructions: Instruction[];
}

interface ScraperConfiguration {
  Global?: GlobalOptions;
  Resources: {
    [propName: string]: Resource;
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
  Resource,
  ScraperConfiguration,
  ScraperQueue,
};
