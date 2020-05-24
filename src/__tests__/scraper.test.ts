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

const expected = [
  {
    name: 'Baeritto',
    age: '28',
    votes: {
      likes: '10',
      dislikes: '2',
    },
  },
  {
    name: 'Toastalicious',
    age: '27',
    votes: {
      likes: '300123',
      dislikes: '17',
    },
  },
  {
    name: 'Crazy Stew',
    age: '27',
    votes: {
      likes: '20',
      dislikes: '2',
    },
  },
  {
    name: 'Beast Andrew',
    age: '30',
    votes: {
      likes: '120',
      dislikes: '5',
    },
  },
];

describe('Instruction processor', () => {
  const result: { [propName: string]: any } = generateInstructions(
    $,
    instructions,
    []
  );

  it('should return an object with property `person`[]', () => {
    expect(result).toHaveProperty('person');
    expect(result.person).toHaveLength(4);
  });

  it('should return person[] with index object properties [`name`, `age`, `votes`]', () => {
    result.person.forEach((set, i) => {
      expect(set).toMatchObject(expected[i]);
    });
  });
});
