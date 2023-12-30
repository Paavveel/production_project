let currentArticleId = '';

describe('user on article details page', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((article) => {
      currentArticleId = article.id;
      cy.visit(`articles/${article.id}`);
    });
  });

  afterEach(() => {
    cy.removeArticle(currentArticleId);
  });

  it('should load article', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist');
  });

  it('should show recommendation articles list', () => {
    cy.getByTestId('ArticleRecommendationsList').should('exist');
  });

  it('should send the comment', () => {
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('AddCommentForm').scrollIntoView();
    cy.addComment('text');
    cy.getByTestId('CommentCard.Content').should('have.length', 1);
  });

  it('should send rating', () => {
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('RatingCard').scrollIntoView();
    cy.setRate(4, 'feedback');
    cy.get('[data-selected=true]').should('have.length', 4);
  });
});
