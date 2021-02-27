export {};

const user = {
  username: 'usertest',
  email: 'usertest@example.com',
  password: 'usertestpassword',
  firstName: 'First Name',
  lastName: 'Last Name',
};
describe('Checkout flow', () => {
  it('should go to checkout', () => {
    cy.visit('/printers');

    // Add printer to cart
    cy.get('[data-cy="printers-card-add-to-cart-button"]').first().click();

    // Checkout
    cy.get('[data-cy="cart-checkout-btn"]').should('exist').click();

    cy.url().should('include', '/checkout');
  });

  it('should login and checkout', () => {
    cy.visit('/printers');

    // Add printer to cart
    cy.get('[data-cy="printers-card-add-to-cart-button"]').first().click();

    // Checkout
    cy.get('[data-cy="cart-checkout-btn"]').should('exist').click();

    cy.url().should('include', '/login');

    // Go to login page
    cy.get('[data-cy="login-page-username-field"]').type(user.username);

    cy.get('[data-cy="login-page-password-field"]').type(user.password);

    cy.get('[data-cy="login-page-sign-in-button"]').click();

    cy.url().should('include', '/checkout');

    // Go to checkout page
    cy.get('[data-cy="checkout-page-first-name-field"]').type(user.firstName);

    cy.get('[data-cy="checkout-page-last-name-field"]').type(user.lastName);

    cy.get('[data-cy="checkout-page-email-field"]').type(user.email);

    cy.get('[data-cy="checkout-page-submit-button"]').should('exist').click();

    cy.url().should('include', '/thankyou');

    cy.contains('Thank You!');
  });
});
