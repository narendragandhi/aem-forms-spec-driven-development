export const demoScenarios = {
  financial: { name: 'Maya Rodriguez', email: 'maya.rodriguez@example.com', amount: '25000', label: 'Financial application', rule: 'When requested amount is above $20,000, show employment details.' },
  claims: { name: 'Jordan Lee', email: 'jordan.lee@example.com', amount: '12000', label: 'Insurance claim', rule: 'When estimated damage is above $10,000, show assessment details.' },
  onboarding: { name: 'Avery Chen', email: 'avery.chen@example.com', amount: '0', label: 'Employee onboarding', rule: 'When the role is remote, show equipment delivery details.' },
  healthcare: { name: 'Taylor Morgan', email: 'taylor.morgan@example.com', amount: '38', label: 'Healthcare intake', rule: 'When mobility support is needed, show accessibility and care-team details.' }
};

export const getDemoScenario = (useCase) => demoScenarios[useCase] || demoScenarios.financial;
