describe('Reusable accordion test', function() {

  it('Render the website', function() {
    cy.visit('http://localhost:3000')
  })

  it('Accordion should be defined', function() {
    cy.fixture('options').then((options) => {
      cy.get(`#${options.container}`)
    })
  })

  it('All the accordion\'s panels should be present', function() {
    cy.fixture('options').then((options) => {
      let numOfPanels = options.panels.length;
      if (options.mainTitle)
        numOfPanels++;

      cy.get(`#${options.container}`).children().should('have.length', numOfPanels)
    })
  })

  it('Panel\'s description conditional css class', function() {
    cy.fixture('options').then((options) => {
      cy.get(`#${options.container}`).find('.accordion__panel').each(($el, index) => {
        if (options.panels[index].subtitle) {
          cy.get($el).should('have.class', 'accordion__panel--with-desc')
        } else {
          cy.get($el).should('have.class', 'accordion__panel--no-desc')
        }
      })
    })
  })

  it('Panels without description height should be 50px', function() {
    cy.get('.accordion__panel--no-desc').should('have.css', 'height', '50px');
  })

  it('Panels with description min-height should be 70px', function() {
    cy.get('.accordion__panel--with-desc').should('have.css', 'min-height', '70px');
  })

  it('Opened panel should have 30px margin top and bottom', function() {
    cy.fixture('options').then((options) => {
      cy.get(`#${options.container}`).first().click()
      cy.get('.accordion__panel-container--active').should('have.css', 'margin', '30px 0px')
    })
  });

})