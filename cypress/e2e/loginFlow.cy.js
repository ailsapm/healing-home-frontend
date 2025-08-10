describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login'); //open login page
  });

  it('logs in successfully with valid admin credentials', () => {
    //fill in email and password
    cy.get('input[type="email"]').type('admin@example.com');
    cy.get('input[type="password"]').type('password');

    //submit the login form
    cy.get('form').submit();

    //should redirect to /home
    cy.url().should('include', '/home');

    //check for welcome message
    cy.contains('Welcome back, Admin!').should('be.visible');
  });
});
