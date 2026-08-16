---
id: SHOWCASE-001-test-002
workflow_id: SHOWCASE-001
type: testing
agent: tester
status: pending
priority: high
created: 2026-08-12T22:00:00Z
updated: 2026-08-12T22:00:00Z
depends_on: [SHOWCASE-001-int-001]
blocks: [SHOWCASE-001-review-001]
---

# Test the complete omnichannel showcase journey

## Context

Extend the existing Cypress flow so the test proves the customer-visible story rather than only checking that a submit button exists.

## Acceptance Criteria

- [ ] Hero, journey stages, secure-session cue, and form card render.
- [ ] Default headless form metadata and model are loaded.
- [ ] A customer can submit the form and see a workflow reference.
- [ ] Signature and Document of Record states advance visibly.
- [ ] Retry and start-another-journey paths work.
- [ ] Mobile viewport and keyboard interaction have coverage.

## Key Files

- `ui.frontend.react.forms.af/cypress/e2e/omnichannel-flow.cy.js`
- `ui.frontend.react.forms.af/src/App.js`

## Related Issues

- Integration: #SHOWCASE-001-int-001
- Review: #SHOWCASE-001-review-001
