---
id: SHOWCASE-001-test-004
workflow_id: SHOWCASE-001
type: testing
agent: tester
status: completed
priority: high
created: 2026-08-12T23:00:00Z
updated: 2026-08-12T23:00:00Z
depends_on: [SHOWCASE-001-impl-003]
blocks: [SHOWCASE-001-review-001]
---

# Validate seeded journey and accessibility behavior

## Acceptance Criteria

- [x] Unit coverage verifies seeded values and adaptive rules.
- [x] Semantic labels, status role, main landmark, and keyboard-operable controls are covered.
- [x] Cypress covers claims journey, onboarding rule interaction, mobile viewport, and architecture visibility.

## Verification Evidence

- React tests: 10 tests pass.
- Cypress spec added: `cypress/e2e/seeded-showcase.cy.js`.
- Cypress execution remains environment-gated until the frontend server is running.
