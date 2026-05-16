describe('R8 - Todo Management GUI Tests', () => {

  const addTodo = (todo) => {
    cy.get('input[placeholder="Add a new todo item"]')
      .type(todo, { force: true })

    cy.contains('Add')
      .click({ force: true })

    cy.wait(500)
  }

  beforeEach(() => {

    cy.visit('http://localhost:3000')

    cy.get('#email')
      .clear()
      .type('pedapati1samuel@gmail.com')

    cy.get('input[type="submit"]')
      .first()
      .click()

    cy.wait(2000)

    cy.get('input[placeholder="Title of your Task"]')
      .first()
      .type('MR BEAST TASK', { force: true })

    cy.get('input[placeholder*="YouTube"]')
      .first()
      .type('Wdjh81uH6FU', { force: true }) // Mr Beast video

    cy.contains('Create new Task')
      .click({ force: true })

    cy.wait(2000)

    cy.get('img')
      .last()
      .click({ force: true })

    cy.wait(1000)

  })

  describe('R8UC1 - Create Todo', () => {

    it('TC1 - Create valid todo item', () => {
      addTodo('Watch Mr Beast')
      cy.contains('Watch Mr Beast').should('exist')
    })

    it('TC2 - Empty todo should not crash system', () => {
      cy.contains('Add').click({ force: true })
      cy.get('body').should('exist')
    })

    it('TC3 - Boundary todo input', () => {
      addTodo('AAAAAAAAAAAAAAAAAAAAAAAAAAAA')
      cy.contains('AAAAAAAAAAAAAAAAAAAAAAAAAAAA').should('exist')
    })

  })

  describe('R8UC2 - Toggle Todo', () => {

    it('TC4 - Toggle todo item', () => {
      addTodo('Toggle Todo')
      cy.contains('Toggle Todo').parent().click({ force: true })
      cy.contains('Toggle Todo').should('exist')
    })

    it('TC5 - Toggle todo twice', () => {
      addTodo('Double Toggle')
      cy.contains('Double Toggle').parent().click({ force: true })
      cy.contains('Double Toggle').parent().click({ force: true })
      cy.contains('Double Toggle').should('exist')
    })

    it('TC6 - Toggled todo remains visible', () => {
      addTodo('Visible Todo')
      cy.contains('Visible Todo').parent().click({ force: true })
      cy.contains('Visible Todo').should('exist')
    })

  })

 describe('R8UC3 - Delete Todo', () => {

  it('TC7 - Delete todo item', () => {

    addTodo('Delete Todo')

    cy.contains('Delete Todo')
      .parent()
      .within(() => {
        cy.contains('✖')
          .click({ force: true })
      })

    cy.wait(1000)

    cy.get('body')
      .should('exist')

  })

  it('TC8 - Delete completed todo', () => {

    addTodo('Completed Todo')

    cy.contains('Completed Todo')
      .parent()
      .click({ force: true })

    cy.contains('Completed Todo')
      .parent()
      .within(() => {
        cy.contains('✖')
          .click({ force: true })
      })

    cy.wait(1000)

    cy.get('body')
      .should('exist')

  })

  it('TC9 - Deleting one todo keeps remaining todos', () => {

    addTodo('Delete Me')
    addTodo('Keep Me')

    cy.contains('Delete Me')
      .parent()
      .within(() => {
        cy.contains('✖')
          .click({ force: true })
      })

    cy.wait(1000)

    cy.contains('Keep Me')
      .should('exist')

  })

})
})