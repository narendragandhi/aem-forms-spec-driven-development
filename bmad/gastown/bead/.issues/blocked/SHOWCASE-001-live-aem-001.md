---
id: SHOWCASE-001-live-aem-001
workflow_id: SHOWCASE-001
type: environment-validation
agent: aem-operator
status: blocked
priority: critical
created: 2026-08-12T23:00:00Z
updated: 2026-08-14T22:02:00Z
depends_on: [SHOWCASE-001-int-001, SHOWCASE-001-test-002]
blocks: [SHOWCASE-001-review-001]
---

# Verify live AEM author-to-publish Forms journey

## Blocker

Author is reachable and the showcase package is installed. Publish remains unavailable at `http://localhost:4503`. Forms runtime is now active on Author. The form was migrated from custom showcase resource types to native Forms types and the native `.model.json` endpoint now returns HTTP 200. Publish, Adobe Sign, and the final DoR round-trip remain unavailable for verification until Publish is running and the corresponding integrations are configured.

## Required Evidence

- Author-created form and rule read back from AEM Author.
- Published form read back from AEM Publish.
- FDM-backed prefill and submit verified.
- Real Adobe Sign agreement and callback verified.
- Generated Document of Record downloaded or read back.

## Author Verification Evidence

- Package `com.example.forms:aem-forms-bmad-showcase.all:1.0.0-SNAPSHOT` installed successfully.
- Core bundle `aem-forms-bmad-showcase.core` is `Active` after removing its unused unresolved Forms API import.
- `/content/forms/af/aem-forms-bmad-showcase/financial-application.html` returns HTTP 200.
- `/bin/bmad/headless-form-service?...financial-application` returns HTTP 200.
- `/bin/bmad/mock-finance-data` returns HTTP 200 with seeded data.
- Native form content read back from `/content/forms/af/aem-forms-bmad-showcase/financial-application/jcr:content.infinity.json` includes `fd/af/components/page2/aftemplatedpage`, `guideContainer`, `rootPanel`, native panels, text boxes, and numeric boxes.
- `/content/forms/af/aem-forms-bmad-showcase/financial-application.model.json` returns HTTP 200 with `fd/af/components/page2/aftemplatedpage` and the native guide container.
- `/content/forms/af/aem-forms-bmad-showcase/financial-application.html` returns HTTP 200 through the Forms runtime; interactive field rendering still requires browser-level verification.

## Resume Conditions

Provide a running Forms Publish environment and credentials through the approved browser/operator surface. Then verify publish, FDM prefill/submit, Adobe Sign callback, and DoR generation.
