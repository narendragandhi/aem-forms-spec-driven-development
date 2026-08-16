---
id: SHOWCASE-001-impl-006
workflow_id: SHOWCASE-001
type: implementation
agent: coder
status: in_progress
priority: high
created: 2026-08-15T00:45:00Z
updated: 2026-08-15T00:45:00Z
depends_on: [SHOWCASE-001-impl-005]
---

# Add seeded human-in-the-loop review

## Acceptance criteria

- [x] Submission pauses at a visible reviewer gate when evaluation recommends review.
- [x] Reviewer can approve and continue to signature.
- [x] Reviewer can reject and stop the journey with a follow-up state.
- [x] Reviewer actor and decision are represented in lifecycle state.
- [ ] Equivalent live AEM Workflow/Inbox action is implemented.

## Evidence

- `ui.frontend.react.forms.af/src/App.js`
- `ui.frontend.react.forms.af/src/App.css`

## Limitation

The current action is a deterministic seeded demo. The live AEM contract is tracked by `SHOWCASE-001-int-002`.
