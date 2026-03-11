describe('Omnichannel Headless Flow', () => {
  beforeEach(() => {
    // Intercept form model and prefill calls
    cy.intercept('GET', '/bin/bmad/headless-form-service*', {
      bmadVersion: "6.0",
      formId: "123",
      endpoint: "/content/forms/af/financial-application.model.json",
      prefillUrl: "/bin/bmad/mock-finance-data",
      submitUrl: "/bin/bmad/headless-submit",
      metadata: { mode: "headless-react" }
    });

    cy.intercept('GET', '/content/forms/af/financial-application.model.json', {
      id: "financial-application",
      items: [
        { id: "customerName", name: "customerName", fieldType: "text-input", label: { value: "Name" } },
        { id: "submit", name: "submit", fieldType: "button", label: { value: "Submit" } }
      ]
    });

    cy.visit('/');
  });

  it('completes the full omnichannel sign lifecycle', () => {
    // 1. Submit the form
    cy.intercept('POST', '/bin/bmad/headless-submit', {
      status: "success",
      workflowId: "WF-TEST-123"
    }).as('formSubmit');

    // Clicking submit (simulating AdaptiveForm submit)
    // For the test, we trigger the submit action manually on the form
    cy.get('button').contains('Submit').click();
    cy.wait('@formSubmit');

    // 2. Poll status (simulating async lifecycle)
    // First poll: OUT_FOR_SIGNATURE
    cy.intercept('GET', '/bin/bmad/headless-status?workflowId=WF-TEST-123', {
      workflowId: "WF-TEST-123",
      state: "RUNNING",
      signingStatus: "OUT_FOR_SIGNATURE",
      dorStatus: "NOT_STARTED"
    }).as('status1');

    cy.contains('Workflow ID: WF-TEST-123').should('be.visible');
    cy.contains('Signing: OUT_FOR_SIGNATURE').should('be.visible');

    // Second poll: SIGNED
    cy.intercept('GET', '/bin/bmad/headless-status?workflowId=WF-TEST-123', {
      workflowId: "WF-TEST-123",
      state: "RUNNING",
      signingStatus: "SIGNED",
      dorStatus: "NOT_STARTED"
    }).as('status2');

    cy.contains('Signing: SIGNED').should('be.visible');

    // Third poll: GENERATED (Success)
    cy.intercept('GET', '/bin/bmad/headless-status?workflowId=WF-TEST-123', {
      workflowId: "WF-TEST-123",
      state: "COMPLETED",
      signingStatus: "SIGNED",
      dorStatus: "GENERATED"
    }).as('status3');

    cy.contains('Document: GENERATED').should('be.visible');
    cy.contains('Your Document of Record is ready for download.').should('be.visible');
  });
});
