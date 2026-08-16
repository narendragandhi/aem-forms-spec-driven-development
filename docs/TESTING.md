# Testing and accessibility

## Unit tests

```bash
cd ui.frontend.react.forms.af
CI=true npm test -- --watchAll=false
```

The current frontend coverage includes showcase configuration, seeded scenarios, the healthcare adaptive rule, and the existing custom address field.

Evaluation coverage also verifies high-risk routing to `HUMAN_REVIEW` and low-risk routing to `AUTO_ADVANCE`. The browser suite covers the seeded approve and reject paths; live Workflow/Inbox coverage remains pending.

## Production build

```bash
npm run build
```

The build may report dependency metadata warnings from the frontend toolchain. Treat compilation failure as a release blocker; review warnings before publishing a demo build.

## Browser tests

The Cypress specs are in `ui.frontend.react.forms.af/cypress/e2e/`. Run them with:

```bash
npm run cypress:run
```

The seeded showcase spec covers use-case loading, adaptive behavior, submission, lifecycle states, and architecture visibility. The omnichannel spec covers the mocked orchestration path.

Playwright CLI is used for local AEM operator verification. It should capture fresh evidence for:

- Author login and environment identity;
- package installation result;
- native model endpoint;
- form HTML endpoint;
- headless metadata and prefill;
- Publish endpoints when available.

## Accessibility checklist

For every seeded scenario and every live form variant, verify:

- keyboard-only navigation;
- visible focus and logical tab order;
- labels and accessible names for every field;
- status and validation messages announced to assistive technology;
- sufficient color contrast;
- no information conveyed by color alone;
- responsive behavior at narrow and zoomed layouts;
- reduced-motion behavior where applicable;
- no console errors or uncaught network failures.

Automated tests are a safety net, not a substitute for manual screen-reader and keyboard review.

## Evidence discipline

Record environment, URL, user, test command, timestamp, and result in the relevant bead. A demo screenshot is useful evidence, but it does not replace an HTTP response, test result, or integration record.
