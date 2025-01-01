describe('Bank Station Page', () => {
  beforeEach(() => {
    cy.visit('/bank-station')
  })

  it('displays account balances', () => {
    cy.get('[data-testid="checking-balance"]').should('be.visible')
    cy.get('[data-testid="savings-balance"]').should('be.visible')
    cy.get('[data-testid="credit-balance"]').should('be.visible')
  })

  it('shows live transaction board', () => {
    cy.get('[data-testid="live-transaction-board"]').should('be.visible')
    cy.get('[data-testid="transaction-item"]').should('have.length.at.least', 1)
  })

  it('allows quick transfer between accounts', () => {
    cy.get('[data-testid="quick-transfer-button"]').click()
    cy.get('[data-testid="from-account-select"]').select('Checking')
    cy.get('[data-testid="to-account-select"]').select('Savings')
    cy.get('[data-testid="transfer-amount"]').type('100')
    cy.get('[data-testid="transfer-submit"]').click()
    
    cy.get('[data-testid="transfer-success"]').should('be.visible')
  })

  it('displays metro-style navigation', () => {
    cy.get('[data-testid="metro-nav"]').should('be.visible')
    cy.get('[data-testid="metro-line-indicator"]').should('have.length.at.least', 3)
  })

  it('handles offline mode', () => {
    // Simulate offline mode
    cy.window().then((win) => {
      cy.stub(win.navigator, 'onLine').value(false)
      win.dispatchEvent(new Event('offline'))
    })

    cy.get('[data-testid="offline-indicator"]').should('be.visible')
    cy.get('[data-testid="cached-data-notice"]').should('be.visible')
  })

  it('supports biometric authentication', () => {
    cy.window().then((win) => {
      cy.stub(win.navigator.credentials, 'get').resolves({
        id: 'test-user',
        type: 'public-key'
      })
    })

    cy.get('[data-testid="biometric-auth-button"]').click()
    cy.get('[data-testid="auth-success"]').should('be.visible')
  })
})
