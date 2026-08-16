---
id: SHOWCASE-001-test-003
workflow_id: SHOWCASE-001
type: testing
agent: tester
status: completed
priority: medium
created: 2026-08-12T22:20:00Z
updated: 2026-08-12T22:20:00Z
depends_on: [SHOWCASE-001-impl-002]
blocks: [SHOWCASE-001-review-001]
---

# Test use-case configuration resolution

## Acceptance Criteria

- [x] Default financial form path is present.
- [x] Claims and onboarding presets resolve correctly.
- [x] Unknown presets use the safe financial fallback.
- [x] Tests pass in the frontend test command.

## Verification Evidence

- `CI=true npm test -- --watchAll=false` — 7 tests passed.

## Files Changed

- `ui.frontend.react.forms.af/src/showcaseConfig.test.js` - preset and fallback coverage.

## Related Issues

- Implementation: #SHOWCASE-001-impl-002
- Review: #SHOWCASE-001-review-001
