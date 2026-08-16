# AEM Forms Showcase Demo Runbook

This runbook is for a 10–20 minute architecture or product demonstration.

## Demo contract

The presenter should state which mode is being shown:

1. **Seeded mode** proves the product narrative, adaptive rule behavior, accessibility affordances, and lifecycle presentation.
2. **Live Author mode** proves that AEM Forms runtime and authored content are reachable.
3. **Live Author-to-Publish mode** is the end-to-end target, but is not currently verified in this repository because local Publish is unavailable.

Never present seeded signature, workflow, or DoR states as proof of a live Adobe integration.

## Seeded healthcare walkthrough

1. Start the frontend:

   ```bash
   cd ui.frontend.react.forms.af
   npm ci
   npm start
   ```

2. Open `http://localhost:3000/?demo=true&useCase=healthcare`.
3. Point out the `SEEDED DEMO` label and synthetic patient scenario.
4. Select the mobility-support option.
5. Show the adaptive support and care-team questions appearing.
6. Submit the form.
7. Walk through the lifecycle cards: intake, review, consent, and document.
8. Explain the architecture strip and identify which states are simulated.

## Evaluation and HITL walkthrough

The seeded journey intentionally pauses before signature when the policy evaluator crosses a threshold:

1. Submit the claims or financial scenario.
2. Point out the score, risk band, recommendation, reason, and policy version.
3. Show the `HUMAN-IN-THE-LOOP` reviewer task.
4. Choose **Approve and continue** to start signature and DoR simulation.
5. Restart and choose **Reject for follow-up** to show the recorded human decision.

This is a deterministic presentation of the control pattern. The live equivalent is an AEM Workflow Assign Task/Inbox step and is tracked separately in the bead convoy.

The healthcare scenario is intentionally fictional. It is not clinical advice, a patient record, or a HIPAA-compliant workflow.

## Live Author verification

With a local Author running at `http://localhost:4502`, verify:

```text
/content/forms/af/aem-forms-bmad-showcase/financial-application.html
/content/forms/af/aem-forms-bmad-showcase/financial-application.model.json
/bin/bmad/headless-form-service?formPath=/content/forms/af/aem-forms-bmad-showcase/financial-application
/bin/bmad/mock-finance-data
```

Expected result:

- The form page returns HTTP 200.
- The native model returns HTTP 200 and identifies `fd/af/components/page2/aftemplatedpage`.
- The headless service returns the model endpoint, prefill URL, and submit URL.
- Mock prefill returns synthetic data.

The full authored tree can be inspected at:

```text
/content/forms/af/aem-forms-bmad-showcase/financial-application/jcr:content.infinity.json
```

## Package installation

Build the content and container packages:

```bash
mvn -B -pl ui.content install
mvn -B -pl all package
```

Install `all/target/aem-forms-bmad-showcase.all-1.0.0-SNAPSHOT.zip` through AEM Package Manager. Re-read the endpoints after installation; a successful upload alone is not verification.

## End-to-end acceptance checklist

- [x] Author Forms runtime is active.
- [x] Native form content is present on Author.
- [x] Author model endpoint returns 200.
- [x] Headless metadata and synthetic prefill return 200.
- [x] Seeded healthcare scenario is testable.
- [ ] Publish form returns 200.
- [ ] Publish model endpoint returns 200.
- [ ] Live FDM prefill and submit are verified.
- [ ] Adobe Sign agreement and callback are verified.
- [ ] DoR is generated and downloaded.
- [ ] Browser accessibility audit passes.

The open acceptance evidence is tracked in [`SHOWCASE-001-live-aem-001.md`](../bmad/gastown/bead/.issues/blocked/SHOWCASE-001-live-aem-001.md).
