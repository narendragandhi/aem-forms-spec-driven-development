---
id: SHOWCASE-001-docs-001
workflow_id: SHOWCASE-001
type: documentation
agent: docs
status: in_progress
priority: medium
created: 2026-08-12T22:00:00Z
updated: 2026-08-15T00:40:00Z
depends_on: [SHOWCASE-001-review-001]
blocks: []
---

# Document the AEM Forms showcase story

## Context

Make the transformational narrative and technical seams discoverable for demo owners, architects, and future agents.

## Acceptance Criteria

- [x] README describes the customer journey and headless architecture.
- [x] Default form path and override behavior are documented.
- [x] Existing backend services and lifecycle states are named.
- [x] Open-source baseline documents exist: contribution, security, code of conduct, architecture, runbook, and testing guidance.
- [x] README claims were reconciled with current Author evidence and explicit live-environment limitations.
- [ ] Final review findings are incorporated after #SHOWCASE-001-review-001.

## Files Changed

- `README.md` - accurate project overview, quick start, status, endpoints, and repository map.
- `docs/ARCHITECTURE.md` - runtime flow and integration boundaries.
- `docs/DEMO-RUNBOOK.md` - seeded, Author, and end-to-end demo procedures.
- `docs/TESTING.md` - unit, browser, accessibility, and evidence guidance.
- `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md` - open-source maintainer baseline.

## Handoff Notes

The documentation set is substantially complete. Final review and browser accessibility evidence remain separate open beads.

## Related Issues

- Review: #SHOWCASE-001-review-001
