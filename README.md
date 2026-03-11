# AEM Forms BMAD Showcase

This project showcases the **BMAD (Breakthrough Method for Agile Development)** for an AEM Forms implementation on Adobe Experience Manager (AEM) as a Cloud Service.

It is generated from the latest AEM Archetype and combines the structured, AI-driven BMAD methodology with a modern AEM Forms technology stack.

## Overview

The BMAD method is an AI-driven agile development framework that provides a structured, agent-based approach to software development. This project demonstrates how to apply this methodology specifically to AEM Forms projects, guiding teams from initial business discovery through the deployment of complex forms and workflows.

This project has been adapted from the original `aem-bmad-showcase` and tailored for AEM Forms. The core BMAD documentation has been migrated and will be updated to reflect Forms-specific use cases.

## Technology Stack

| Layer | Technology |
|---|---|
| CMS / Forms | Adobe Experience Manager as a Cloud Service |
| Backend | Java 21+, OSGi, Sling Models |
| Frontend (Forms) | **React**, AEM Forms Component Library |
| Form Submission Workflows | AEM Workflows with custom steps |
| CI/CD | Adobe Cloud Manager |
| CDN | Adobe Managed CDN (Fastly) |

## Modules

This project was generated with AEM Archetype 56 and includes Forms-specific modules:

* **core**: Java bundle containing OSGi services, workflow steps, and Sling Models for form processing.
* **ui.apps**: Contains traditional AEM components, dialogs, and crucially, the compiled output of the forms frontend.
* **ui.config**: Contains runmode-specific OSGi configurations.
* **ui.content**: Contains sample content, including Adaptive Form templates, themes, and example forms.
* **ui.frontend.react**: A dedicated front-end build mechanism for React.
* **ui.frontend.react.forms.af**: **The primary location for developing custom React components for Adaptive Forms.**
* **all**: A single content package that embeds all compiled modules for deployment to AEM as a Cloud Service.
* **dispatcher**: Contains the dispatcher configurations.

## How to Build

To build all the modules, run the following command in the project root directory:

    mvn clean install

To build and deploy the complete package to a local AEM instance, run:

    mvn clean install -PautoInstallSinglePackage

## Adapting the BMAD Methodology for AEM Forms

The included `bmad/` directory contains the full methodology. When applying it to a Forms project, the focus of each phase shifts:

- **Phase 01: Business Discovery**: User stories will focus on form-filling journeys, data submission requirements, and approval processes.
- **Phase 02: Model Definition**: This phase will define **Form Data Models (FDM)**, JSON schemas for forms, and create Adaptive Form templates and themes.
- **Phase 03: Architecture Design**: Component design will focus on **custom Adaptive Form fields** (e.g., an address lookup field) rather than website components.
- **Phase 04: Development Sprint**: Development will center on creating custom React form components in the `ui.frontend.react.forms.af` module and building workflows to orchestrate form submissions.

Please refer to the documents in the `bmad/` directory for a deeper understanding of the methodology.

### **Advanced Showcase Examples (BMAD v6 Expansion)**

The project now includes advanced examples demonstrating complex form logic and dynamic data orchestration:

1.  **Complex Adaptive Form (Financial Services Application):**
    *   **Location:** `/content/forms/af/aem-forms-bmad-showcase/financial-application`
    *   **Features:** Multi-step **Wizard Layout**, Lead Notations, and a **Dynamic Table** for Employment History (Add/Delete rows).
    *   **Compliance:** Built with Core Components v2 for WCAG 2.2 support.

2.  **Dynamic Interactive Communication (Annual Statement):**
    *   **Location:** `/content/forms/ic/aem-forms-bmad-showcase/annual-statement`
    *   **Features:** Dynamic **Transaction Table** that automatically expands based on JSON data payload. Demonstrates `bindRef` patterns for document fragments.
3.  **Mock Finance Data Service:**
    *   **Endpoint:** `/bin/bmad/mock-finance-data`
    *   **Usage:** Serves as a simulated backend for Form Data Models (FDM). Use this to test dynamic table population in AF and IC.

### **Headless Forms Integration (BMAD v6)**

The showcase now supports **Headless AEM Forms** orchestration, enabling forms to be authored in AEM and rendered in any external React/SPA or AEM Edge Delivery Services (EDS) environment.

*   **Headless Service Endpoint:** `/bin/bmad/headless-form-service?formPath=[path-to-form]`
*   **Key Dependencies:** Uses `@adobe/aem-forms-af-react-components` for client-side rendering.
*   **Workflow:**
    1.  Fetch the headless metadata wrapper from the service endpoint.
    2.  Use the `endpoint` URL (`.model.json`) to load the form structure into the React Headless SDK.
    3.  Submit data back to `/bin/bmad/headless-submit` for centralized BMAD orchestration.

## Build & Deployment
