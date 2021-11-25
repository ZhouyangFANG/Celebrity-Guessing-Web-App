describe('A player deletes their information', () => {
  it('deletes their information', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#input').type('newUser');
    cy.get('#start').click();
    for (let i = 0; i < 10; i += 1) {
      cy.get('#a').click();
    }
    cy.get('#showScores').click();
    cy.get('#deleteInfo').click();
    cy.contains('Your account was successfully deleted!').should('exist');
  });
});