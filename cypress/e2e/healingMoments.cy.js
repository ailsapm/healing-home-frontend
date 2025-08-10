describe('Healing Moments Page', () => {
  beforeEach(() => {
    //login via API to be able to visit protected pages
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/login',
      body: {
        email: 'admin@example.com',
        password: 'password',
      },

    }).then((resp) => {
      expect(resp.status).to.eq(200); // ensure login succeeded
    });

    //visit healing moments protected page on frontend port 3001
    cy.visit('http://localhost:3001/healing-moments');
  });

  it('displays Guided Meditations heading', () => {
    cy.contains('Guided Meditations').should('be.visible');
  });

  it('renders at least one embedded video iframe', () => {
    cy.get('iframe').should('have.length.greaterThan', 0);
  });

  it('shows Writing & Reflection Prompts section', () => {
    cy.contains('Writing & Reflection Prompts').should('be.visible');
  });
});
