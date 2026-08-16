---
id: SHOWCASE-001-test-005
workflow_id: SHOWCASE-001
type: testing
agent: tester
status: completed
priority: medium
created: 2026-08-14T12:00:00Z
updated: 2026-08-14T12:00:00Z
depends_on: [SHOWCASE-001-impl-004]
blocks: [SHOWCASE-001-review-001]
---

# Test healthcare intake preset

## Acceptance Criteria

- [x] Healthcare preset resolves.
- [x] Synthetic patient data prefills.
- [x] Mobility support activates the accessibility/care-team rule.
- [x] Full frontend test suite passes.

## Verification Evidence

- `CI=true npm test -- --watchAll=false` — 11 tests passed.
