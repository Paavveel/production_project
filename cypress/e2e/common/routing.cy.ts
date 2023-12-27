import { selectByTestId } from '../../helpers/selectByTestId';

describe('Routing', () => {
  describe('user does not authorize', () => {
    it('to the main page', () => {
      cy.visit('/');
      cy.get(selectByTestId('MainPage')).should('exist');
    });

    it('to the profile page', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('MainPage')).should('exist');
    });

    it('not existing route', () => {
      cy.visit('wrongroute');
      cy.get(selectByTestId('NotFoundPage')).should('exist');
    });
  });

  describe('user authorize', () => {
    beforeEach(() => {
      cy.login();
    });

    it('to the profile page', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('ProfilePage')).should('exist');
    });

    it('to the articles page', () => {
      cy.visit('/articles');
      cy.get(selectByTestId('ArticlesPage')).should('exist');
    });
  });
});
