describe('Performance Tests', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        win.performance.mark('test-start')
      }
    })
  })

  it('loads main content within performance budget', () => {
    cy.window().then((win) => {
      win.performance.mark('test-end')
      win.performance.measure('load-time', 'test-start', 'test-end')
      const measures = win.performance.getEntriesByName('load-time')
      expect(measures[0].duration).to.be.lessThan(3000) // 3s budget
    })
  })

  it('maintains smooth scrolling performance', () => {
    cy.window().then((win) => {
      let layoutShifts = 0
      new win.PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          layoutShifts += entry.value
        }
      }).observe({ entryTypes: ['layout-shift'] })

      cy.scrollTo('bottom', { duration: 1000 })
      cy.wait(1000).then(() => {
        expect(layoutShifts).to.be.lessThan(0.1) // CLS threshold
      })
    })
  })

  it('loads images efficiently', () => {
    cy.get('img').each(($img) => {
      cy.wrap($img)
        .should('be.visible')
        .and(($img) => {
          expect($img[0].naturalWidth).to.be.greaterThan(0)
        })
    })
  })

  it('maintains responsive performance', () => {
    cy.viewport('iphone-x')
    cy.get('[data-testid="metro-nav"]').should('be.visible')
    cy.viewport('macbook-15')
    cy.get('[data-testid="metro-nav"]').should('be.visible')
  })
})
