const defaultFormPath = '/content/forms/af/aem-forms-bmad-showcase/financial-application';

export const showcaseConfigs = {
  financial: {
    eyebrow: 'DEMO / FINANCIAL SERVICES',
    title: 'Find your next right move',
    heroEyebrow: 'THE FORM IS THE PRODUCT',
    heroTitle: <>Turn a complex decision into a <span>confident next step.</span></>,
    heroCopy: 'A reference experience for modern AEM Forms—where adaptive questions, trusted data, signatures, and documents move as one connected journey.',
    railKicker: 'SHOWCASE JOURNEY',
    railTitle: 'Financial confidence, assembled.',
    railCopy: 'See how one Adaptive Form becomes a personalized, omnichannel service moment.',
    proofPoints: ['Headless by design', 'Accessible by default', 'Ready for orchestration'],
    stages: [
      { number: '01', label: 'Discover', detail: 'A clear path for every customer' },
      { number: '02', label: 'Decide', detail: 'Adaptive logic, less friction' },
      { number: '03', label: 'Orchestrate', detail: 'One submission, many outcomes' }
    ],
    statusSteps: [
      { key: 'submitted', label: 'Application received', detail: 'Your information is securely captured.' },
      { key: 'signature', label: 'Signature requested', detail: 'Adobe Sign is ready for the next step.' },
      { key: 'document', label: 'Document of Record', detail: 'A finished artifact for the customer.' }
    ]
  },
  claims: {
    eyebrow: 'DEMO / INSURANCE CLAIMS',
    title: 'Make a difficult moment simpler',
    heroEyebrow: 'DESIGNED FOR MOMENTS THAT MATTER',
    heroTitle: <>Turn a stressful claim into a <span>clear path forward.</span></>,
    heroCopy: 'Capture the right details once, guide the customer with adaptive questions, and keep every next step visible from intake to resolution.',
    railKicker: 'CLAIMS JOURNEY',
    railTitle: 'Confidence after the unexpected.',
    railCopy: 'A compassionate claim experience that connects intake, assessment, and resolution.',
    proofPoints: ['Guided intake', 'Evidence, captured once', 'Resolution orchestration'],
    stages: [
      { number: '01', label: 'Tell us what happened', detail: 'An empathetic, guided intake' },
      { number: '02', label: 'Assess the situation', detail: 'Only ask what matters next' },
      { number: '03', label: 'Resolve with confidence', detail: 'Updates and documents in one place' }
    ],
    statusSteps: [
      { key: 'submitted', label: 'Claim received', detail: 'Your details are securely captured.' },
      { key: 'signature', label: 'Assessment in progress', detail: 'The right team has been notified.' },
      { key: 'document', label: 'Resolution ready', detail: 'Your claim outcome is ready to review.' }
    ]
  },
  onboarding: {
    eyebrow: 'DEMO / EMPLOYEE ONBOARDING',
    title: 'Start strong from day one',
    heroEyebrow: 'THE FIRST DAY STARTS HERE',
    heroTitle: <>Turn paperwork into a <span>welcoming first step.</span></>,
    heroCopy: 'Give new employees a single, adaptive journey for identity, policy, equipment, and everything they need to feel ready to begin.',
    railKicker: 'ONBOARDING JOURNEY',
    railTitle: 'A better beginning, assembled.',
    railCopy: 'A guided experience that brings people, policies, and approvals together before day one.',
    proofPoints: ['One welcoming journey', 'Rules that adapt', 'Ready before day one'],
    stages: [
      { number: '01', label: 'Welcome', detail: 'Collect only the essentials' },
      { number: '02', label: 'Prepare', detail: 'Personalize what comes next' },
      { number: '03', label: 'Activate', detail: 'Coordinate every handoff' }
    ],
    statusSteps: [
      { key: 'submitted', label: 'Details received', detail: 'Your onboarding profile is secure.' },
      { key: 'signature', label: 'Policies requested', detail: 'Required acknowledgements are ready.' },
      { key: 'document', label: 'Welcome kit ready', detail: 'Your first-day documents are available.' }
    ]
  },
  healthcare: {
    eyebrow: 'DEMO / HEALTHCARE INTAKE',
    title: 'Make the next care step clearer',
    heroEyebrow: 'CARE, CONNECTED',
    heroTitle: <>Turn patient intake into a <span>calmer care journey.</span></>,
    heroCopy: 'Collect the right information with empathy, adapt the experience to patient needs, and connect intake to care-team coordination without repeating the story.',
    railKicker: 'CARE JOURNEY',
    railTitle: 'A more human intake, assembled.',
    railCopy: 'A synthetic patient scenario showing how forms can guide intake, triage, consent, and follow-up.',
    proofPoints: ['Patient-centered intake', 'Adaptive triage', 'Connected follow-up'],
    stages: [
      { number: '01', label: 'Understand the need', detail: 'A calm, accessible first step' },
      { number: '02', label: 'Guide the next question', detail: 'Only ask what is relevant' },
      { number: '03', label: 'Connect the care team', detail: 'Route consent and follow-up' }
    ],
    statusSteps: [
      { key: 'submitted', label: 'Intake received', detail: 'Your information is securely captured.' },
      { key: 'signature', label: 'Consent requested', detail: 'The required consent is ready to review.' },
      { key: 'document', label: 'Care summary ready', detail: 'Your next-step summary is available.' }
    ]
  }
};

export const getShowcaseConfig = (useCase) => showcaseConfigs[useCase] || showcaseConfigs.financial;

export { defaultFormPath };
