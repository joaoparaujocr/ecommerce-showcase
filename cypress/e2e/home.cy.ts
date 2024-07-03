describe('Home page', () => {
  it('should be possible to add items to the cart', () => {
    cy.visit('http://localhost:3000')


    cy.get('[data-testid="loading"]').should('not.exist')
    cy.get('[data-testid="button-cart"]').should('exist').click().as("buttonCart")
    cy.get('[data-testid="empty-cart"]').should('exist').should('have.text', 'Seu carrinho está vazio')
    cy.get('[data-testid="close-cart"]').should('exist').click()
    cy.get('[data-testid="button-add-item-product"]:first').click()

    cy.get('@buttonCart').click()
    cy.get('[data-testid="empty-cart"]').should('not.exist')
  })
})