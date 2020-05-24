import * as YAML from 'yamljs';
import * as fs from 'fs';
import * as chalk from 'chalk';

export const loadAllConfigs = (basePath: string): object[] => {
  const result = [];
  const fileNames = fs.readdirSync(basePath);

  fileNames.forEach((file) => {
    if (/.yaml|.yml/.test(file)) {
      const config = YAML.load(`${basePath}/${file}`);

      console.log(chalk.magenta('====Config===='));
      console.log(chalk.yellow(JSON.stringify(config, null, 2)));

      result.push(config);
    }
  });

  return result;
};
