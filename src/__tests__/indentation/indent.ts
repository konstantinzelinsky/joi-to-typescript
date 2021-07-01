import { existsSync, readFileSync, rmdirSync } from 'fs';
import { convertFromDirectory } from '../..';

describe('indentation', () => {
  const typeOutputDirectory = './src/__tests__/indentation/interfaces';
  beforeEach(() => {
    if (existsSync(typeOutputDirectory)) {
      rmdirSync(typeOutputDirectory, { recursive: true });
    }
  });

  test('default indentation', async () => {
    const result = await convertFromDirectory({
      schemaDirectory: './src/__tests__/indentation/schemas',
      typeOutputDirectory
    });

    expect(result).toBe(true);

    const content = readFileSync(`${typeOutputDirectory}/Nested.ts`).toString();

    expect(content).toBe(`/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface Nested {
  address?: {
    line1: string;
    line2?: string;
    suburb: string;
  };
  connections?: {
    frogs?: {
      colour: string;
      legs?: {
        toe: number;
      };
    }[];
    name?: string;
    type?: string[];
  }[];
  name?: string;
}
`);
  });

  test('4 space indentation', async () => {
    const result = await convertFromDirectory({
      schemaDirectory: './src/__tests__/indentation/schemas',
      typeOutputDirectory,
      indentationChacters: '    '
    });

    expect(result).toBe(true);

    const content = readFileSync(`${typeOutputDirectory}/Nested.ts`).toString();

    expect(content).toBe(`/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface Nested {
    address?: {
        line1: string;
        line2?: string;
        suburb: string;
    };
    connections?: {
        frogs?: {
            colour: string;
            legs?: {
                toe: number;
            };
        }[];
        name?: string;
        type?: string[];
    }[];
    name?: string;
}
`);
  });

  test('tab indentation', async () => {
    const result = await convertFromDirectory({
      schemaDirectory: './src/__tests__/indentation/schemas',
      typeOutputDirectory,
      indentationChacters: '\t'
    });

    expect(result).toBe(true);

    const content = readFileSync(`${typeOutputDirectory}/Nested.ts`).toString();

    // Had to use \t as my editor is setup to convert tabs to spaces
    expect(content).toBe(`/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface Nested {
\taddress?: {
\t\tline1: string;
\t\tline2?: string;
\t\tsuburb: string;
\t};
\tconnections?: {
\t\tfrogs?: {
\t\t\tcolour: string;
\t\t\tlegs?: {
\t\t\t\ttoe: number;
\t\t\t};
\t\t}[];
\t\tname?: string;
\t\ttype?: string[];
\t}[];
\tname?: string;
}
`);
  });
});