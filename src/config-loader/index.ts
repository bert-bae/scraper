import * as YAML from 'yamljs';
import * as fs from 'fs';
import * as chalk from 'chalk';

export const loadAllConfigs = (): object[] => {
  const result = [];
  const fileNames = fs.readdirSync('../../config');

  fileNames.forEach((file) => {
    const config = YAML.load(`../../config/${file}`);

    console.log(chalk.magenta('====Config===='));
    console.log(chalk.yellow(JSON.stringify(config, null, 2)));

    result.push(config);
  });

  return result;
};
