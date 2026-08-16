# Contributing

Thanks for contributing to the AEM Forms BMAD Showcase.

## Before changing code

1. Read the relevant BMAD material under `bmad/`.
2. Find or create a small bead for the change.
3. Define acceptance evidence before implementation.
4. Keep seeded demo behavior separate from live AEM behavior.

## Development rules

- Do not commit credentials, tokens, customer data, PHI, or production URLs.
- Prefer native AEM Forms resource types for authored Forms content.
- Keep use-case copy and seeded data in the configuration/scenario modules.
- Add or update tests with behavior changes.
- Preserve accessible labels, focus behavior, status announcements, and keyboard operation.
- Document any limitation that prevents live verification.

## Pull requests

A pull request should include:

- a concise problem statement;
- linked bead(s);
- implementation and design notes;
- tests run and their results;
- screenshots or endpoint evidence for UI/AEM changes;
- security and privacy impact;
- known follow-up work.

Do not describe a seeded simulation as a live Adobe integration.
