describe('Bank Store Page', () => {
  beforeEach(() => {
    cy.visit('/bank-store')
  })

  it('displays product lines as metro lines', () => {
    cy.get('[data-testid="product-line"]').should('have.length', 5)
    cy.get('[data-testid="product-line-credit"]').should('be.visible')
    cy.get('[data-testid="product-line-mortgage"]').should('be.visible')
    cy.get('[data-testid="product-line-savings"]').should('be.visible')
  })

  it('shows product recommendations', () => {
    cy.get('[data-testid="recommendations-section"]').should('be.visible')
    cy.get('[data-testid="product-card"]').should('have.length.at.least', 3)
  })

  it('allows product filtering', () => {
    cy.get('[data-testid="filter-dropdown"]').click()
    cy.get('[data-testid="filter-credit-cards"]').click()
    cy.get('[data-testid="product-card"]').should('have.length.at.least', 1)
    cy.get('[data-testid="product-type-credit"]').should('be.visible')
  })

  it('supports product search', () => {
    cy.get('[data-testid="search-input"]').type('savings')
    cy.get('[data-testid="search-submit"]').click()
    cy.get('[data-testid="search-results"]').should('be.visible')
    cy.get('[data-testid="product-card"]').should('have.length.at.least', 1)
  })

  it('handles product comparison', () => {
    cy.get('[data-testid="product-card"]').first().click()
    cy.get('[data-testid="compare-button"]').click()
    cy.get('[data-testid="product-card"]').eq(1).click()
    cy.get('[data-testid="comparison-table"]').should('be.visible')
  })

  it('supports theme switching', () => {
    cy.get('[data-testid="theme-switcher"]').click()
    cy.get('[data-testid="theme-ginza"]').click()
    cy.get('body').should('have.css', 'background-color', 'rgb(255, 149, 0)')
  })
})
