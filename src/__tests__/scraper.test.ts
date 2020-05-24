import * as cheerio from 'cheerio';
import { generateInstructions } from '../processor/instruction-generator';
import { html } from '../__test-utils__/mock-html';

const $ = cheerio.load(html);
const instructions = [
  {
    Selector: 'div',
    Output: 'person',
    Operation: [
      {
        Selector: '.name',
        Output: 'name',
        Operation: 'text',
      },
      {
        Selector: '.age',
        Output: 'age',
        Operation: 'text',
      },
      {
        Selector: '.vote-container',
        Output: 'votes',
        Operation: [
          {
            Selector: '.likes',
            Output: 'likes',
            Operation: 'text',
          },
          {
            Selector: '.dislikes',
            Output: 'dislikes',
            Operation: 'text',
          },
        ],
      },
    ],
  },
];

describe('Instruction processor', () => {
  const result = generateInstructions($, instructions, []);
  it('should run test', () => {
    console.log(JSON.stringify(result, null, 2));
    expect(true).toBe(true);
  });
});
