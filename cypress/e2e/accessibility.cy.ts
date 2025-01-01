describe('Accessibility Tests', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.injectAxe()
  })

  it('has no detectable accessibility violations on home page', () => {
    cy.checkA11y()
  })

  it('maintains focus management', () => {
    // Test modal focus trap
    cy.get('[data-testid="quick-transfer-button"]').click()
    cy.focused().should('have.attr', 'data-testid', 'modal-close')
    cy.tab().focused().should('have.attr', 'data-testid', 'from-account-select')
    cy.tab().focused().should('have.attr', 'data-testid', 'to-account-select')
  })

  it('supports keyboard navigation', () => {
    cy.get('body').tab()
    cy.focused().should('be.visible')
    cy.focused().type('{enter}')
  })

  it('has sufficient color contrast', () => {
    cy.checkA11y(null, {
      rules: {
        'color-contrast': { enabled: true }
      }
    })
  })

  it('provides alternative text for images', () => {
    cy.get('img').each(($img) => {
      cy.wrap($img).should('have.attr', 'alt')
    })
  })

  it('has proper ARIA labels', () => {
    cy.get('[aria-label]').should('be.visible')
    cy.get('[role]').should('have.attr', 'aria-label')
  })
})
