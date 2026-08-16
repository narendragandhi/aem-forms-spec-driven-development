# AEM Forms BMAD Showcase

An open reference implementation for demonstrating Adobe Experience Manager (AEM) Forms as a connected customer journey: authored form definition, adaptive rules, data integration, workflow, signature, and Document of Record (DoR).

The project also demonstrates BMAD (Breakthrough Method for Agile Development) with small, traceable work items managed as beads. It is intended for demos, architecture workshops, and experimentation—not as a production-ready healthcare or financial-services application.

## What makes the showcase useful

- A polished React shell around an authored Adaptive Form.
- Tailorable journeys for financial services, claims, onboarding, and healthcare.
- Seeded demo mode for deterministic presentations without AEM.
- Native AEM Forms content under `fd/af/components/...`.
- Headless metadata, prefill, submission, workflow, signature, and DoR seams.
- Deterministic policy evaluation with an explicit human-review gate in seeded mode.
- Architecture visibility for the audience: Author → Publish → Headless Form → FDM + Rules → Workflow → Sign + DoR.
- Bead-based planning, implementation, testing, review, and environment evidence.

## Current verification status

| Capability | Status | Evidence |
|---|---|---|
| React unit tests | Passing | 3 suites, 11 tests passed in the latest run |
| Production frontend build | Passing | `npm run build` |
| Seeded demo browser journey | Passing | Playwright CLI evidence for claims scenario |
| Seeded evaluation + HITL journey | Passing | 13 frontend tests; approve/reject browser spec added |
| Native form content on Author | Passing | `jcr:content.infinity.json` contains native Forms tree |
| Author `.model.json` endpoint | Passing | HTTP 200 on the financial form |
| Author HTML render | Passing | HTTP 200 through Forms runtime |
| Publish verification | Blocked | Local Publish at `localhost:4503` unavailable |
| Live Adobe Sign callback | Not verified | Requires configured integration |
| Live DoR generation/download | Not verified | Requires configured workflow/output integration |
| Browser accessibility audit | Pending | Seeded form has accessibility tests; full audit remains open |

See [the demo runbook](docs/DEMO-RUNBOOK.md) for the exact evidence and limitations.

## Quick start

### Seeded demo mode

Seeded mode is the fastest way to present the experience. It uses synthetic data and does not prove a live AEM integration.

```text
/?demo=true&useCase=financial
/?demo=true&useCase=claims
/?demo=true&useCase=onboarding
/?demo=true&useCase=healthcare
```

Run the frontend from `ui.frontend.react.forms.af`:

```bash
npm ci
npm start
```

Then open `http://localhost:3000/?demo=true&useCase=healthcare`.

### Live AEM mode

Live mode reads the authored form model and calls the configured orchestration endpoints:

```text
http://localhost:3000/?useCase=financial
```

The default form path is:

```text
/content/forms/af/aem-forms-bmad-showcase/financial-application
```

Use `formPath` to point the shell at another authored form:

```text
/?useCase=claims&formPath=/content/forms/af/<your-form>
```

The frontend configuration is in [`showcaseConfig.js`](ui.frontend.react.forms.af/src/showcaseConfig.js); seeded data is in [`demoScenarios.js`](ui.frontend.react.forms.af/src/demoScenarios.js).

## AEM endpoints

| Endpoint | Purpose |
|---|---|
| `/bin/bmad/headless-form-service?formPath=...` | Returns form metadata and orchestration URLs |
| `/content/forms/af/.../financial-application.model.json` | Native AEM Forms model endpoint |
| `/content/forms/af/.../financial-application.html` | Author-rendered form page |
| `/bin/bmad/mock-finance-data` | Synthetic prefill data for local demonstrations |
| `/bin/bmad/headless-submit` | Showcase submission seam |

The live endpoints require an AEM Forms runtime. Do not use the mock data endpoint with real personal or patient information.

## Build and test

Prerequisites: Java 21+, Maven 3.8.6+, Node/npm for the frontend, and an AEM Forms Author when running live mode.

```bash
# Frontend unit tests
cd ui.frontend.react.forms.af
CI=true npm test -- --watchAll=false

# Frontend production build
npm run build

# Maven build
cd ../..
mvn -B clean install
```

For a focused content refresh after changing authored form XML:

```bash
mvn -B -pl ui.content install
mvn -B -pl all package
```

See [TESTING.md](docs/TESTING.md) for browser, accessibility, and AEM verification guidance.

## Repository map

| Path | Responsibility |
|---|---|
| `core` | OSGi services, Sling models, and workflow-facing Java code |
| `ui.apps` | AEM components and client-library definitions |
| `ui.content` | Forms, templates, themes, FDM examples, and sample content |
| `ui.frontend.react.forms.af` | React Forms renderer, showcase shell, seeded scenarios, and browser specs |
| `ui.config` | OSGi and environment configuration |
| `all` | Deployable container package |
| `dispatcher` | Dispatcher configuration |
| `bmad` | Methodology, architecture, operations, tests, and bead tracking |
| `docs` | Maintainer-facing showcase and verification documentation |

## BMAD and beads

Work is intentionally broken into small beads that can be independently implemented, tested, reviewed, and evidenced. Start with:

- [Beads setup](bmad/gastown/bead/BEADS-SETUP.md)
- [Showcase convoy](bmad/gastown/bead/SHOWCASE-001-convoy.yaml)
- [GasTown overview](bmad/gastown/README.md)

The Markdown bead files are the portable fallback when the `bd` database is unavailable.

## Architecture and design

- [Architecture overview](docs/ARCHITECTURE.md)
- [Demo runbook](docs/DEMO-RUNBOOK.md)
- [Testing and accessibility](docs/TESTING.md)
- [Evaluation and HITL](docs/EVALUATION-HITL.md)
- [Reusable project playbook](docs/PROJECT-PLAYBOOK.md)
- [Product presentation runbook](docs/PRESENTATION-RUNBOOK.md)
- [Contract matrix](docs/CONTRACT-MATRIX.md)
- [BMAD integration guide](bmad/06-Integrations/headless-forms.md)
- [Forms architecture source](bmad/03-Architecture-Design/system-architecture.md)

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a change. All contributions must preserve the distinction between seeded demo behavior and verified live AEM behavior.

## Security and privacy

This repository contains synthetic data only. Never commit AEM credentials, Adobe Sign secrets, patient data, financial records, or production configuration. Report vulnerabilities using [SECURITY.md](SECURITY.md).

## License

Licensed under the Apache License 2.0. See [LICENSE](LICENSE).
