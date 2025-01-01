/// <reference types="cypress" />
import '@testing-library/cypress/add-commands'

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit('/login')
    cy.get('[data-testid="email-input"]').type(email)
    cy.get('[data-testid="password-input"]').type(password)
    cy.get('[data-testid="login-submit"]').click()
    cy.url().should('include', '/bank-station')
  })
})

Cypress.Commands.add('mockBiometricAuth', (success: boolean = true) => {
  cy.window().then((win) => {
    cy.stub(win.navigator.credentials, 'get').resolves(
      success ? {
        id: 'test-user',
        type: 'public-key'
      } : null
    )
  })
})

Cypress.Commands.add('mockNfcPayment', (success: boolean = true) => {
  cy.window().then((win) => {
    cy.stub(win.navigator.nfc, 'requestDevice').resolves({
      addEventListener: cy.stub(),
      removeEventListener: cy.stub(),
      send: cy.stub().resolves(success)
    })
  })
})

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      mockBiometricAuth(success?: boolean): Chainable<void>
      mockNfcPayment(success?: boolean): Chainable<void>
    }
  }
}
