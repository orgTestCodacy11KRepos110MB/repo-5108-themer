import { render, renderInstructions } from './index.mjs';
import { colors } from '@themerdev/colors-default';
import { describe, expect, it } from 'vitest';

describe('render', () => {
  it('should render properly formatted ConEmu theme xml', async () => {
    const files = await Promise.all(render(colors));
    expect(files.length).toBe(2);
    files.forEach((file) => {
      expect(/themer-(dark|light)\.xml/.test(file.name)).toBe(true);
      expect(file.contents.toString('utf8')).toMatchSnapshot();
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