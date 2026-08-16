---
id: SHOWCASE-001-test-001
workflow_id: SHOWCASE-001
type: testing
agent: tester
status: completed
priority: high
created: 2026-08-12T22:00:00Z
updated: 2026-08-12T22:00:00Z
depends_on: [SHOWCASE-001-impl-001]
blocks: [SHOWCASE-001-review-001]
---

# Verify the showcase frontend foundation

## Context

Cover the custom form field and production frontend compilation introduced with the showcase shell.

## Acceptance Criteria

- [x] Custom address field renders, edits, disables, and hides correctly.
- [x] Jest can isolate the AEM SDK wrapper from the component unit test.
- [x] React production build succeeds.
- [x] Build warnings are recorded for follow-up rather than treated as application failures.

## Verification Evidence

- `CI=true npm test -- --watchAll=false` — 4 tests passed.
- `npm run build` — compiled successfully; existing Spectrum `postcss-calc` warning remains.

## Files Changed

- `ui.frontend.react.forms.af/src/main/webpack/components/CustomAddressField.test.js` - mocked SDK wrapper for isolated unit testing.

## Handoff Notes

Browser-level journey coverage remains outstanding in #SHOWCASE-001-test-002.

## Related Issues

- Implementation: #SHOWCASE-001-impl-001
- Review: #SHOWCASE-001-review-001
