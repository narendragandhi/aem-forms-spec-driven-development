---
id: SHOWCASE-001-impl-005
workflow_id: SHOWCASE-001
type: implementation
agent: coder
status: completed
priority: high
created: 2026-08-15T00:45:00Z
updated: 2026-08-15T00:45:00Z
depends_on: [SHOWCASE-001-impl-003]
---

# Add evaluation contract

## Acceptance criteria

- [x] Seeded submissions receive a deterministic score, band, recommendation, reason, and policy version.
- [x] Threshold submissions recommend `HUMAN_REVIEW`.
- [x] Low-risk submissions recommend `AUTO_ADVANCE`.
- [x] Evaluation logic is isolated from presentation code.

## Evidence

- `ui.frontend.react.forms.af/src/evaluation.js`
- `ui.frontend.react.forms.af/src/evaluation.test.js`
