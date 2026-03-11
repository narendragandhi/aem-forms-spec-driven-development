# Omnichannel Sign & DoR Architecture

This document describes the high-level architecture for the headless AEM Forms lifecycle, from initial data pre-fill to final signing and document generation.

## Sequence Diagram

```mermaid
sequenceDiagram
    participant U as User (React App)
    participant BFF as HeadlessFormService (BFF)
    participant AEM as AEM Core (Forms/Workflow)
    participant SIG as Adobe Sign (Mock)
    participant DOR as DoR Service

    Note over U, BFF: Initial Data Loading
    U->>BFF: Request Form (formPath)
    BFF->>AEM: Get Prefill Data (MockFinanceDataServlet)
    AEM-->>BFF: Prefill JSON
    BFF-->>U: Form Model + Prefill Data

    Note over U, BFF: Headless Submission
    U->>BFF: POST Submission Data (headless-submit)
    BFF->>AEM: Initiate Workflow (SignToDoRProcess)
    AEM-->>BFF: workflowId
    BFF-->>U: 200 OK (workflowId)

    Note over U, BFF: Status Polling Loop
    loop Every 3 Seconds
        U->>BFF: GET Status (headless-status?workflowId=...)
        BFF->>AEM: Check Workflow Metadata
        AEM-->>BFF: {signingStatus, dorStatus}
        BFF-->>U: Current Status JSON
    end

    Note over AEM, SIG: Async Orchestration
    AEM->>SIG: Create Agreement
    SIG-->>AEM: agreementId
    Note right of SIG: Human signs the document...
    SIG->>AEM: Webhook / Polling (Status: SIGNED)
    
    Note over AEM, DOR: Final Generation
    AEM->>DOR: Generate DoR (PDF)
    DOR-->>AEM: PDF Content
    AEM->>AEM: Finalize Workflow
```

## Component Roles

| Component | Responsibility |
| :--- | :--- |
| **HeadlessFormService** | Orchestrates pre-fill, submission, and status polling (BFF). |
| **SignToDoRProcess** | AEM Workflow process managing the long-running async lifecycle. |
| **AdobeSignOrchestrator** | Mock service simulating the Adobe Sign API and status transitions. |
| **Prefill Orchestrator** | Maps enterprise data to the form fields before the user sees the form. |
