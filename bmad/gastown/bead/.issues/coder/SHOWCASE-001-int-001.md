---
id: SHOWCASE-001-int-001
workflow_id: SHOWCASE-001
type: integration
agent: coder
status: pending
priority: high
created: 2026-08-12T22:00:00Z
updated: 2026-08-12T22:00:00Z
depends_on: [SHOWCASE-001-plan-001]
blocks: [SHOWCASE-001-test-002, SHOWCASE-001-review-001]
---

# Validate the headless Forms orchestration integration

## Context

Verify and harden the connection between the React showcase and the AEM backend services: headless form metadata, `.model.json`, submission, status polling, signature state, and Document of Record state.

## Acceptance Criteria

- [ ] Headless service returns a valid endpoint for the default financial application.
- [ ] Submit payload reaches `/bin/bmad/headless-submit` with the expected structure.
- [ ] Workflow status polling handles pending, signature, signed, and generated states.
- [ ] Error responses are safe, actionable, and do not expose sensitive submission data.
- [ ] AEMaaCS configuration and dispatcher behavior are documented.

## Key Files

- `core/src/main/java/com/example/forms/core/services/HeadlessFormService.java`
- `core/src/main/java/com/example/forms/core/services/HeadlessSubmitServlet.java`
- `ui.frontend.react.forms.af/src/App.js`

## Handoff Notes

The current service is explicitly mocked for demo/local operation. Keep that behavior available, but mark production-required seams clearly and test both local fallback and real workflow responses.

## Related Issues

- Planning: #SHOWCASE-001-plan-001
- Testing: #SHOWCASE-001-test-002
- Review: #SHOWCASE-001-review-001
