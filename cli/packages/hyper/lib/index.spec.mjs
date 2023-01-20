import { render, renderInstructions } from './index.mjs';
import { colors } from '@themerdev/colors-default';
import { basename } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('Hyper.app theme generator', () => {
  const promisedFiles = Promise.all(render(colors, {}));

  it('should render four files when given a color set with both a light and a dark theme', async () => {
    const files = await promisedFiles;
    expect(files.length).toBe(4);
    expect(
      files.filter((file) => basename(file.name) === 'package.json').length,
    ).toBe(2);
    expect(
      files.filter((file) => basename(file.name) === 'index.js').length,
    ).toBe(2);
  });

  it('should render valid JSON to package.json files', async () => {
    const files = await promisedFiles;
    files
      .filter((file) => basename(file.name) === 'package.json')
      .map((file) => JSON.parse(file.contents.toString('utf8')))
      .forEach((packageJson) => {
        delete packageJson.version;
        expect(packageJson).toMatchSnapshot();
      });
  });

  it('should render valid plugin files', async () => {
    const files = await promisedFiles;
    files
      .filter((file) => basename(file.name) !== 'package.json')
      .forEach((file) =>
        expect(file.contents.toString('utf8')).toMatchSnapshot(),
      );
  });

  it('should provide promised files whose contents are buffers', async () => {
    const files = await promisedFiles;
    files.forEach((file) => expect(file.contents).toBeInstanceOf(Buffer));
  });

  it('should provide installation instructions', async () => {
    const files = await Promise.all(render(colors));
    const instructions = renderInstructions(files.map(({ name }) => name));
    expect(instructions).toMatchSnapshot();
  });
});