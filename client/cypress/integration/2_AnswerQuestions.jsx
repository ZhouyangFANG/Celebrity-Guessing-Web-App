describe('A player answers a question', () => {
  it('answers a question', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#input').type('newUser');
    cy.get('#start').click();
    cy.get('#a').click();
  });
});
