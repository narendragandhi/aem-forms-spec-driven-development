# Security Review

The showcase is safe for synthetic demo data only. It is not approved for PHI,
financial production data, or real signatures without an environment review.

Reviewed controls:

- seeded mode contains no external credentials;
- form payloads are represented in logs only by byte count and correlation ID;
- CSRF and AEM authentication remain deployment controls;
- health/metrics output excludes form data;
- evaluation and HITL decisions are explicit and auditable in the demo state;
- live Adobe Sign, Inbox, DoR, dispatcher, CORS, and secret-store controls are
  integration acceptance criteria, not assumed by demo mode.

Before production use, add webhook authentication/replay protection, rate and
payload limits, least-privilege service users, provider URL allowlists, PHI
retention/encryption controls, dependency scanning, DAST, and an independent
healthcare privacy/security review.
