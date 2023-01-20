import { render, renderInstructions } from './index.mjs';
import { colors } from '@themerdev/colors-default';
import { describe, expect, it } from 'vitest';

describe('render', () => {
  const promisedFiles = Promise.all(render(colors));

  it('should render the expected number of files', async () => {
    const files = await promisedFiles;
    expect(files.length).toBe(2);
  });

  it('should render valid Slack theme strings', async () => {
    const files = await promisedFiles;
    files.forEach((file) => {
      const contents = file.contents.toString('utf8');
      expect(/\,\,/.test(contents)).toBe(false);
      expect(/\s/.test(contents)).toBe(false);
    });
  });
});

describe('renderInstructions', () => {
  it('should provide installation instructions', async () => {
    const files = await Promise.all(render(colors));
    const instructions = renderInstructions(files.map(({ name }) => name));
    expect(instructions).toMatchSnapshot();
  });
});