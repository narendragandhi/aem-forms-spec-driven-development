---
id: SHOWCASE-001-impl-004
workflow_id: SHOWCASE-001
type: implementation
agent: coder
status: completed
priority: medium
created: 2026-08-14T12:00:00Z
updated: 2026-08-14T12:00:00Z
depends_on: [SHOWCASE-001-impl-003]
blocks: [SHOWCASE-001-test-005, SHOWCASE-001-review-001]
---

# Add healthcare intake showcase preset

## Acceptance Criteria

- [x] Healthcare narrative supports intake, adaptive triage, consent, and care summary.
- [x] Synthetic patient data is used for seeded demos.
- [x] Mobility-support selection activates an adaptive rule.
- [x] Existing financial, claims, and onboarding journeys remain unchanged.
- [x] README usage is updated.

## Files Changed

- `ui.frontend.react.forms.af/src/showcaseConfig.js`
- `ui.frontend.react.forms.af/src/demoScenarios.js`
- `ui.frontend.react.forms.af/src/DemoForm.js`
- `README.md`
