export {};
describe('Description', () => {
  it('cart exists', () => {
    cy.visit('/');
    cy.get('[data-cy="nav-cart-button"]').click().should('exist');
    cy.get('[data-cy="cart"] ').should('exist');
    cy.contains('Your Cart');
    cy.get('[data-cy="cart-checkout-btn"]').should('exist');
    cy.get('[data-cy="cart-clear-btn"]').should('exist');
  });

  it('can add product to cart', () => {
    cy.visit('/printers');
    cy.get('[data-cy="printers-card-add-to-cart-button"]').should('exist');
    cy.get('[data-cy="printers-card-add-to-cart-button"]').first().click();
    cy.get('[data-cy="cart-remove-btn"]').should('exist');
    cy.get('[data-cy="cart-increment-btn"]').should('exist');
    cy.get('[data-cy="cart-decrement-btn"]').should('exist');
    cy.contains('Your Cart');
  });

  it('can increment and decrement the quantity of a product', () => {
    cy.visit('/printers');

    // Get the increment button
    cy.get('[data-cy="printers-card-add-to-cart-button"]').first().click();

    // Increment by 10
    for (let n = 0; n < 9; n++) {
      cy.get('[data-cy="cart-increment-btn"]').click();
    }

    // Check for correct quantity
    cy.get('[data-cy="cart-product-quantity-text"]').should('have.text', 10);

    cy.get('[data-cy="cart-decrement-btn"]').click();

    cy.get('[data-cy="cart-product-quantity-text"]').should('have.text', 9);
  });

  it('can remove products from the cart', () => {
    cy.visit('/printers');

    // Get the increment button
    cy.get('[data-cy="printers-card-add-to-cart-button"]').first().click();

    cy.get('[data-cy="cart-product-quantity-text"]').should('have.text', 1);

    cy.get('[data-cy="cart-remove-btn"]').click();

    cy.get('[data-cy="cart-product-quantity-text"]').should('not.exist');
  });
});
