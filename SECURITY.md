# Security policy

## Scope

This repository is a demonstration and reference project. It is not approved for production personal, financial, or protected health information.

## Reporting a vulnerability

Do not open a public issue for a security vulnerability. Contact the repository maintainers privately through the security contact configured by the hosting organization. Include the affected component, reproduction steps, impact, and a safe contact method.

## Safe-use requirements

- Use synthetic data in local demos.
- Store credentials in environment-specific secret management, never in source or `.env` files committed to Git.
- Review CORS, dispatcher, authentication, authorization, workflow permissions, audit logging, retention, and encryption before deployment.
- Treat Adobe Sign callbacks and Document of Record artifacts as sensitive.
- Healthcare deployments require an independent privacy, security, identity, and compliance review.
