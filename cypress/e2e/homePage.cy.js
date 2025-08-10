describe('Home Page', () => {
  beforeEach(() => {
    //login via API to set cookie for auth
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/login',
      body: {
        email: 'admin@example.com',
        password: 'password',
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200);
    });

    //visit frontend home page after login
    cy.visit('http://localhost:3001/home');
  });

  it('renders welcome text with "With love and light"', () => {
    cy.contains('With love and light').should('be.visible');
  });

  it('renders the Healing Home logo image', () => {
    cy.get('img[alt="Healing Home Logo"]').should('be.visible');
  });
});
