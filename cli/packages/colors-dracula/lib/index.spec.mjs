import { colors } from './index.mjs';
import { describe, expect, it } from 'vitest';

describe('@themerdev/colors-dracula', () => {
  it('should define all required colors for a dark theme only', () => {
    const prefixes = [
      'accent0',
      'accent1',
      'accent2',
      'accent3',
      'accent4',
      'accent5',
      'accent6',
      'accent7',
      'shade0',
      'shade7',
    ];
    prefixes.forEach((prefix) => {
      expect(colors.dark[prefix]).toBeDefined();
    });
    expect(colors.light).not.toBeDefined();
  });
});