import { isArray, isEmpty, some } from 'lodash';

import { Instruction } from '../../typings/types';

export const generateInstructions = (
  crawler: Function,
  instructions: Instruction[],
  selectorPath: string[]
): object => {
  const result: { [propName: string]: any } = {};

  instructions.forEach((set) => {
    const elements = crawler([...selectorPath, set.Selector].join(' '));
    const output: object[] = [];

    elements.each((i, el) => {
      if (isArray(set.Operation)) {
        const data = generateInstructions(crawler, set.Operation, [
          ...selectorPath,
          elements.length === 1
            ? set.Selector
            : `${set.Selector}:nth-child(${i})`,
        ]);

        if (!some(data, isEmpty)) {
          output.push(data);
        }
      } else {
        output.push(crawler(el)[set.Operation]());
      }
    });

    result[set.Output] = output.length <= 1 ? output[0] : output;
  });

  return result;
};
