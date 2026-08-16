describe('Seeded AEM Forms showcase', () => {
  it('demonstrates adaptive rules, orchestration, and architecture visibility', () => {
    cy.visit('/?demo=true&useCase=claims');
    cy.contains('SEEDED DEMO').should('be.visible');
    cy.contains('Seeded scenario · Insurance claim').should('be.visible');
    cy.get('[role="status"]').should('contain', 'Adaptive rule activated');
    cy.contains('button', 'Continue this seeded journey').click();
    cy.contains('POLICY EVALUATION').should('be.visible');
    cy.contains('Human review required').should('be.visible');
    cy.contains('HUMAN-IN-THE-LOOP').should('be.visible');
    cy.contains('button', 'Approve and continue').click();
    cy.contains('Your application is moving forward.').should('be.visible');
    cy.contains('UNDER THE EXPERIENCE').should('be.visible');
    cy.contains('Author').should('be.visible');
  });

  it('records a human rejection before signature', () => {
    cy.visit('/?demo=true&useCase=financial');
    cy.contains('button', 'Continue this seeded journey').click();
    cy.contains('button', 'Reject for follow-up').click();
    cy.contains('HUMAN DECISION RECORDED').should('be.visible');
    cy.contains('Follow-up is required.').should('be.visible');
  });

  it('supports keyboard and mobile-friendly form controls', () => {
    cy.viewport(390, 844);
    cy.visit('/?demo=true&useCase=onboarding');
    cy.get('input[aria-label="Full name"]').should('be.visible').focus().type(' Jr');
    cy.get('select[aria-label="Work arrangement"]').select('remote');
    cy.get('[role="status"]').should('be.visible');
    cy.contains('button', 'Continue this seeded journey').should('be.visible');
  });
});
