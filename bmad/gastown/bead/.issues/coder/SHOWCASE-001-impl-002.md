---
id: SHOWCASE-001-impl-002
workflow_id: SHOWCASE-001
type: implementation
agent: coder
status: completed
priority: medium
created: 2026-08-12T22:20:00Z
updated: 2026-08-12T22:20:00Z
depends_on: [SHOWCASE-001-impl-001]
blocks: [SHOWCASE-001-test-003, SHOWCASE-001-review-001]
---

# Add use-case narrative configuration

## Context

Separate industry-specific narrative from the reusable showcase shell so the same AEM Forms experience can be tailored without duplicating orchestration code.

## Acceptance Criteria

- [x] Financial, insurance claims, and employee onboarding presets exist.
- [x] `useCase` selects the narrative preset.
- [x] `formPath` independently selects the authored AEM form.
- [x] Unknown use cases fall back safely to financial services.
- [x] New presets can be added in one configuration file.

## Files Changed

- `ui.frontend.react.forms.af/src/showcaseConfig.js` - narrative presets and resolver.
- `ui.frontend.react.forms.af/src/App.js` - config-driven rendering.
- `README.md` - use-case and form-path usage.

## Related Issues

- Implementation: #SHOWCASE-001-impl-001
- Testing: #SHOWCASE-001-test-003
- Review: #SHOWCASE-001-review-001
