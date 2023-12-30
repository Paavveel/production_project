describe('Routing', () => {
  describe('user does not authorize', () => {
    it('to the main page', () => {
      cy.visit('/');
      cy.getByTestId('MainPage').should('exist');
    });

    it('to the profile page', () => {
      cy.visit('/profile/1');
      cy.getByTestId('MainPage').should('exist');
    });

    it('not existing route', () => {
      cy.visit('wrongroute');
      cy.getByTestId('NotFoundPage').should('exist');
    });
  });

  describe('user authorize', () => {
    beforeEach(() => {
      cy.login();
    });

    it('to the profile page', () => {
      cy.visit('/profile/1');
      cy.getByTestId('ProfilePage').should('exist');
    });

    it('to the articles page', () => {
      cy.visit('/articles');
      cy.getByTestId('ArticlesPage').should('exist');
    });
  });
});
