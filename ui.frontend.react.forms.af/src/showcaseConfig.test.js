import { defaultFormPath, getShowcaseConfig } from './showcaseConfig';

describe('showcase configuration', () => {
  test('provides a financial default form path', () => {
    expect(defaultFormPath).toContain('/content/forms/af/');
    expect(getShowcaseConfig('financial').eyebrow).toContain('FINANCIAL');
  });

  test('resolves tailored use-case narratives', () => {
    expect(getShowcaseConfig('claims').eyebrow).toContain('CLAIMS');
    expect(getShowcaseConfig('onboarding').eyebrow).toContain('ONBOARDING');
    expect(getShowcaseConfig('healthcare').eyebrow).toContain('HEALTHCARE');
  });

  test('falls back safely for unknown use cases', () => {
    expect(getShowcaseConfig('unknown').title).toBe(getShowcaseConfig('financial').title);
  });
});
