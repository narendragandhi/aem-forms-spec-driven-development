---
id: SHOWCASE-001-int-002
workflow_id: SHOWCASE-001
type: integration
agent: coder
status: pending
priority: critical
created: 2026-08-15T00:45:00Z
updated: 2026-08-15T00:45:00Z
depends_on: [SHOWCASE-001-impl-005, SHOWCASE-001-impl-006]
---

# Map evaluation and HITL to live AEM Workflow/Inbox

## Acceptance criteria

- [ ] Submission persists evaluation result and policy version.
- [ ] AEM Workflow creates an Assign Task for a named reviewer/group.
- [ ] Approve/reject actions update workflow metadata and audit records.
- [ ] Rejection supports follow-up/resubmission.
- [ ] Approval is the prerequisite for signature and DoR.
- [ ] Author and Publish evidence is captured.

## Blockers

- Publish is unavailable in the current local environment.
- Adobe Sign and DoR integrations are not configured for live verification.
