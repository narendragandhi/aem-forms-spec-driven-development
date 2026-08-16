# Architecture

## Runtime flow

```text
AEM Author
  └─ authored Adaptive Form + rules + template
       ↓ publish
AEM Publish
  └─ .model.json / HTML delivery
       ↓
React Forms shell
  └─ headless metadata + native Forms model
       ↓
FDM / prefill / validation
       ↓
submission endpoint
       ↓
policy evaluation
       ↓
human review / approval
       ↓
workflow + review
       ↓
Adobe Sign + Document of Record
```

The React shell is deliberately not the source of truth for authored fields. AEM Forms content owns the form definition; the shell owns presentation, use-case narrative, demo mode, and lifecycle visibility.

## Implemented layers

### Native form content

The financial form is stored in `ui.content` using native Forms resource types:

- `fd/af/components/page2/aftemplatedpage`
- `fd/af/components/guideContainer`
- `fd/af/components/rootPanel`
- `fd/af/components/panel`
- `fd/af/components/guidetextbox`
- `fd/af/components/guidenumericbox`

### Showcase shell

`ui.frontend.react.forms.af/src/App.js` provides:

- live form-model loading;
- seeded scenario selection;
- lifecycle and architecture panels;
- configurable use-case copy;
- error and loading states.

`DemoForm.js` is intentionally separate from live AEM rendering. This keeps deterministic demo behavior visible and prevents it from being confused with authored production rules.

### Configuration

Use-case presets are defined in `showcaseConfig.js`. Synthetic data is defined in `demoScenarios.js`. Add a new use case by adding a preset and scenario, then add unit and browser coverage.

## Integration boundaries

The current repository contains integration seams and local verification for Author. A production deployment must provide:

- configured AEM Publish;
- a real FDM or approved external data service;
- workflow model and service permissions;
- Adobe Sign credentials, agreement configuration, and callback handling;
- DoR/output configuration;
- dispatcher and CORS rules appropriate to the deployment;
- privacy, retention, audit, and consent controls.

Evaluation must be treated as an advisory decision service, not an autonomous authorization. Persist the score, policy version, input facts, recommendation, reviewer identity, decision, timestamp, and reason. Signature and DoR generation must be downstream of the approved decision.

These requirements are not implied by the seeded demo.

## Healthcare tailoring

The healthcare preset is a presentation-safe example using synthetic data. It demonstrates accessibility-sensitive intake, conditional support questions, consent lifecycle language, and care-team follow-up. It must not be connected to real PHI without a separate security, privacy, compliance, identity, and operational design review.
