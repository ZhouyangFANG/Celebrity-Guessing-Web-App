describe('A player enters their username, and the next view is loaded', () => {
  it('next view loaded', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#input').type('newUser');
    cy.get('#start').click();
    cy.contains('Your Current Score').should('exist');
  });
});
