
describe('R8 - Todo Management GUI Tests', () => {

  const addTodo = (todo) => {

    cy.get('input[placeholder="Add a new todo item"]')
      .clear()
      .type(todo, { force: true })

    cy.contains('Add')
      .click({ force: true })

    cy.wait(500)

  }

  const closeAndReopenTask = () => {

    cy.contains('close')
      .click({ force: true })

    cy.get('img')
      .last()
      .click({ force: true })

    cy.wait(1000)

  }

  const deleteTodoAndRefresh = (description) => {

    cy.contains(description)
      .parents('.todo-item')
      .find('.remover')
      .click({ force: true })

    // Verify deletion through GUI only
    closeAndReopenTask()

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

    const taskTitle = `MR BEAST TASK ${Date.now()}`

    cy.get('input[placeholder="Title of your Task"]')
      .first()
      .type(taskTitle, { force: true })

    cy.get('input[placeholder*="YouTube"]')
      .first()
      .type('Wdjh81uH6FU', { force: true })

    cy.contains('Create new Task')
      .click({ force: true })

    cy.wait(2000)

    cy.get('img')
      .last()
      .click({ force: true })

    cy.wait(1000)

  })

  afterEach(() => {

    const email = 'pedapati1samuel@gmail.com'

    cy.request(`http://localhost:5001/users/bymail/${email}`)
      .then((res) => {

        const user = res.body

        const uid =
          user && user._id && user._id.$oid
            ? user._id.$oid
            : user._id

        if (!uid) return

        cy.request(`http://localhost:5001/tasks/ofuser/${uid}`)
          .then((r) => {

            const tasks = r.body || []

            cy.wrap(tasks).each((task) => {

              const tid =
                task._id && task._id.$oid
                  ? task._id.$oid
                  : task._id

              cy.request(
                'DELETE',
                `http://localhost:5001/tasks/byid/${tid}`
              )

            })

          })

      })

  })

  describe('R8UC1 - Create Todo', () => {

    it('TC1 - Create valid todo item', () => {

      addTodo('Watch Mr Beast')

      cy.contains('Watch Mr Beast')
        .should('exist')

    })

    it('TC2 - Empty todo keeps Add disabled', () => {

      cy.get('input[type="submit"][value="Add"]')
        .should('be.disabled')

    })

  })

  describe('R8UC2 - Toggle Todo', () => {

    it('TC3 - Toggle active todo to completed', () => {

      addTodo('Toggle Todo')

      cy.contains('Toggle Todo')
        .parents('.todo-item')
        .find('.checker')
        .click({ force: true })

      cy.contains('Toggle Todo')
        .parents('.todo-item')
        .find('.checker')
        .should('have.class', 'checked')

    })

    it('TC4 - Toggle completed todo back to active', () => {

      addTodo('Double Toggle')

      cy.contains('Double Toggle')
        .parents('.todo-item')
        .find('.checker')
        .click({ force: true })

      cy.contains('Double Toggle')
        .parents('.todo-item')
        .find('.checker')
        .click({ force: true })

      cy.contains('Double Toggle')
        .parents('.todo-item')
        .find('.checker')
        .should('have.class', 'unchecked')

    })

  })

  describe('R8UC3 - Delete Todo', () => {

    it('TC5 - Delete active todo', () => {

      addTodo('Delete Todo')

      deleteTodoAndRefresh('Delete Todo')

      cy.contains('Delete Todo')
        .should('not.exist')

    })

    it('TC6 - Delete completed todo', () => {

      addTodo('Completed Todo')

      cy.contains('Completed Todo')
        .parents('.todo-item')
        .find('.checker')
        .click({ force: true })

      deleteTodoAndRefresh('Completed Todo')

      cy.contains('Completed Todo')
        .should('not.exist')

    })

  })

})

