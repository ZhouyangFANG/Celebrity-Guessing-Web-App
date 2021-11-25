describe('A player displays the leaders', () => {
  it('displays the leaders', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#input').type('newUser');
    cy.get('#start').click();
    for (let i = 0; i < 10; i += 1) {
      cy.get('#a').click();
    }
    cy.get('#displayLeaders').click();
    cy.contains('Stop display leaders').should('exist');
  });
});
