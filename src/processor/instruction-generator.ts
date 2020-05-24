import { isArray } from 'lodash';

import { Instruction } from '../../typings/types';

export const generateInstructions = (
  crawler: Function,
  instructions: Instruction[],
  selectorPath: string[]
): object => {
  const result: { [propName: string]: any } = {};

  instructions.forEach((set) => {
    const elements = crawler([...selectorPath, set.Selector].join(' '));
    const output = [];
    if (set.Selector === '.likes' || set.Selector === '.dislikes') {
      console.log('=====');
      // console.log([...selectorPath, set.Selector]);
      console.log([...selectorPath, set.Selector].join(' '));
    }

    elements.each((i, el) => {
      if (isArray(set.Operation)) {
        output.push(
          generateInstructions(crawler, set.Operation, [
            ...selectorPath,
            elements.length === 1
              ? set.Selector
              : `${set.Selector}:nth-child(${i})`,
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
