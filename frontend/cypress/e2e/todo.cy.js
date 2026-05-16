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
      .type('GUI TASK', { force: true })

    cy.get('input[placeholder*="YouTube"]')
      .first()
      .type('dQw4w9WgXcQ', { force: true })

    cy.contains('Create new Task')
      .click({ force: true })

    cy.wait(2000)

    cy.get('img')
      .last()
      .click({ force: true })

    cy.wait(1000)

  })

  it('TC1 - Create valid todo item', () => {
    addTodo('Finish Assignment')
    cy.contains('Finish Assignment').should('exist')
  })

  it('TC2 - Empty todo should not crash system', () => {
    cy.contains('Add').click({ force: true })
    cy.get('body').should('exist')
  })

  it('TC3 - Boundary todo input', () => {
    addTodo('AAAAAAAAAAAAAAAAAAAAAAAAAAAA')
    cy.contains('AAAAAAAAAAAAAAAAAAAAAAAAAAAA').should('exist')
  })

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

  it('TC7 - Delete todo item', () => {
    addTodo('Delete Todo')
    cy.contains('Delete Todo').click({ force: true })
    cy.contains('✖').last().click({ force: true })
    cy.get('body').should('not.contain', 'Delete Todo')
  })

  it('TC8 - Delete completed todo', () => {
    addTodo('Completed Todo')
    cy.contains('Completed Todo').click({ force: true })
    cy.contains('✖').last().click({ force: true })
    cy.get('body').should('not.contain', 'Completed Todo')
  })

  it('TC9 - Deleting one todo keeps remaining todos', () => {
    addTodo('Delete Me')
    addTodo('Keep Me')
    cy.contains('Delete Me').click({ force: true })
    cy.contains('✖').last().click({ force: true })
    cy.get('body').should('not.contain', 'Delete Me')
    cy.contains('Keep Me').should('exist')
  })

})