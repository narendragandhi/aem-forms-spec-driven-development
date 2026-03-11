# Headless AEM Forms with BMAD

This document describes the implementation of headless Adaptive Forms within the BMAD Showcase project.

## Architecture

The headless forms architecture consists of:

1.  **AEM Adaptive Form**: The source of truth for the form model, created in the AEM Forms editor.
2.  **Headless Form Service (BFF)**: An OSGi servlet at `/bin/bmad/headless-form-service` that acts as a Backend-for-Frontend. It provides a metadata wrapper around the form's `.model.json`.
3.  **Headless Submit Servlet**: A mock servlet at `/bin/bmad/headless-submit` that handles form submissions from headless consumers.
4.  **React Frontend Module**: Located in `ui.frontend.react.forms.af`, this is a standalone React application that uses Adobe's Headless Forms SDK to render the form.

## Components

### 1. Backend Services (Core)

*   **`HeadlessFormService.java`**: Redirects to or wraps the form model JSON.
*   **`HeadlessSubmitServlet.java`**: Processes POST requests containing form data.

### 2. Frontend Module (React)

The `ui.frontend.react.forms.af` module is built using Maven and NPM. It leverages the following Adobe libraries:

*   `@aemforms/af-core`: Core logic and state management.
*   `@aemforms/af-react-renderer`: The component that renders the form from JSON.
*   `@aemforms/af-react-components`: Standard React components for Adaptive Forms.

### 3. Custom Components

Custom React components for forms are developed in `ui.frontend.react.forms.af/src/main/webpack/components`.

Example: `CustomAddressField.js`

## How to use

1.  **Generate a Form**: Create an Adaptive Form in AEM (e.g., at `/content/forms/af/aem-forms-bmad-showcase/financial-application`).
2.  **Access Headless View**: Navigate to the React app (deployed as part of the showcase) and provide the `formPath` parameter:
    `http://localhost:4502/content/bmad-showcase/headless-forms.html?formPath=/content/forms/af/aem-forms-bmad-showcase/financial-application`
    *(Note: Integration with an AEM page is handled via a clientlib or a separate host)*.

## BMAD Benefits for Headless

*   **Model-First Design**: Define your form structure once and consume it anywhere.
*   **Metadata Orchestration**: The BFF service injects BMAD-specific metadata (versioning, agent hints) into the form delivery.
*   **Decoupled Development**: Frontend teams can work on custom React components independently of AEM's traditional rendering pipeline.
