describe('A player displays all the players', () => {
  it('displays all the players', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#input').type('newUser');
    cy.get('#start').click();
    for (let i = 0; i < 10; i += 1) {
      cy.get('#a').click();
    }
    cy.get('#showScores').click();
    cy.wait(1500)
    cy.get('#displayAll').click();
    cy.contains('newUser:10').should('exist');
  });
});