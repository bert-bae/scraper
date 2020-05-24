import { isArray } from 'lodash';

import { Instruction } from '../../typings/types';

export const generateInstructions = (
  crawler: Function,
  instructions: Instruction[],
  selectorPath: string[]
): object => {
  const result: { [propName: string]: any } = {};

  instructions.forEach((set) => {
    console.log([...selectorPath, set.Selector].join(' '));
    const elements = crawler([...selectorPath, set.Selector].join(' '));
    const output = [];

    elements.each((i, el) => {
      if (isArray(set.Operation)) {
        output.push(
          generateInstructions(crawler, set.Operation, [
            ...selectorPath,
            `${set.Selector}:nth-child(${i})`,
          ])
        );
      } else {
        output.push(crawler(el)[set.Operation]());
      }
    });

    result[set.Output] = output.length <= 1 ? output[0] : output;
  });

  return result;
};
