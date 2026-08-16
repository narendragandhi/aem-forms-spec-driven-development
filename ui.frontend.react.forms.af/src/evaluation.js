export const evaluateSubmission = (data, useCase) => {
  const amount = Number(data.amount || 0);
  const ruleWeight = data.ruleActive ? 25 : 0;
  const useCaseWeight = useCase === 'healthcare' ? (data.support === 'mobility' ? 45 : 20)
    : useCase === 'claims' ? (amount >= 10000 ? 50 : 15)
      : useCase === 'financial' ? (amount >= 20000 ? 50 : 15)
        : data.role === 'remote' ? 30 : 10;
  const score = Math.min(100, 15 + ruleWeight + useCaseWeight);
  const requiresReview = score >= 50;

  return {
    score,
    band: score >= 75 ? 'HIGH' : score >= 50 ? 'MEDIUM' : 'LOW',
    recommendation: requiresReview ? 'HUMAN_REVIEW' : 'AUTO_ADVANCE',
    reason: requiresReview
      ? 'The submitted facts crossed a policy threshold and require a human decision.'
      : 'The submitted facts are within the configured low-risk policy band.',
    policy: `demo-${useCase}-v1`
  };
};
