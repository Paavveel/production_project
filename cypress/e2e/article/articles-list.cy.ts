describe('user on articles page', () => {
  beforeEach(() => {
    cy.login().then(() => {
      cy.visit('articles');
    });
  });
  it('should load article list', () => {
    cy.getByTestId('ArticleList').should('exist');
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
  });
});
