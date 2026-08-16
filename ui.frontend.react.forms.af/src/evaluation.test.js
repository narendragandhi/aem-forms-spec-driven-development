import { evaluateSubmission } from './evaluation';

describe('evaluateSubmission', () => {
  test('routes a threshold financial request to human review', () => {
    expect(evaluateSubmission({ amount: '25000', ruleActive: true }, 'financial')).toEqual(expect.objectContaining({
      recommendation: 'HUMAN_REVIEW',
      band: 'HIGH'
    }));
  });

  test('allows a low-risk onboarding request to auto-advance', () => {
    expect(evaluateSubmission({ role: 'hybrid', ruleActive: false }, 'onboarding')).toEqual(expect.objectContaining({
      recommendation: 'AUTO_ADVANCE',
      band: 'LOW'
    }));
  });
});
