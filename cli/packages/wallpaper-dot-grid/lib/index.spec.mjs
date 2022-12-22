import { render, renderInstructions } from './index.mjs';
import { colors } from '@themerdev/colors-default';
import { describe, expect, it } from 'vitest';

describe('themer "dot grid" wallpaper', () => {
  it(`should return PNG data`, async () => {
    const files = await Promise.all(
      render(colors, { 'themer-wallpaper-dot-grid-size': '600x600' }),
    );
    expect(files.length).toBe(4);
    expect(files.filter((file) => /\.png/.test(file.name)).length).toBe(4);
  });
  it('should list output files', async () => {
    const files = await Promise.all(
      render(colors, { 'themer-wallpaper-dot-grid-size': '1000x1000' }),
    );
    const instructions = renderInstructions(files.map(({ name }) => name));
    expect(instructions).toMatchSnapshot();
  });
});
