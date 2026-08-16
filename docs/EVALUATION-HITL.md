# Evaluation and human-in-the-loop

## Purpose

The showcase demonstrates a safe orchestration pattern:

```text
submitted facts → policy evaluation → human decision → signature → DoR
```

Evaluation recommends a path; it does not replace an accountable human for high-impact decisions.

## Seeded contract

`evaluateSubmission(data, useCase)` returns:

| Field | Meaning |
|---|---|
| `score` | Deterministic demo score from 0–100 |
| `band` | `LOW`, `MEDIUM`, or `HIGH` |
| `recommendation` | `AUTO_ADVANCE` or `HUMAN_REVIEW` |
| `reason` | Human-readable explanation |
| `policy` | Versioned policy identifier, for example `demo-financial-v1` |

The implementation is in `ui.frontend.react.forms.af/src/evaluation.js`. It is synthetic demo logic and must not be used for real credit, insurance, clinical, employment, or eligibility decisions.

## HITL behavior

For `HUMAN_REVIEW`, the UI:

1. shows the score and recommendation;
2. pauses before signature;
3. presents an explicit reviewer task;
4. records `APPROVED` or `REJECTED` with a reviewer actor;
5. starts signature only after approval;
6. presents follow-up state after rejection.

The seeded actor is `demo-reviewer`. It is not an authenticated identity or an audit record.

## Live AEM target

The live implementation should map these states to an AEM Workflow model:

- Persist submission and evaluation result.
- Create an Assign Task for a reviewer group.
- Expose the task through AEM Inbox or an approved reviewer UI.
- Record reviewer identity, decision, reason, timestamp, and policy version.
- Support reject-and-resubmit without losing the original decision history.
- Gate Adobe Sign and DoR steps on approval.

The live contract is tracked in bead `SHOWCASE-001-int-002`; it is not claimed as complete until Author/Publish and the configured integrations are verified.
