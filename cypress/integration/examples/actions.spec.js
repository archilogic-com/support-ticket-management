describe('Smoke Test', () => {
  it('Visit', () => {
    cy.visit('localhost:3000')
  })
  it('Selects loaded', () => {
    cy.get('[data-cy=status]').click();
    cy.get('[data-cy=hours]').click();
  })


  it('Table loaded?', () => {

    cy.get('.ant-table-tbody').find('tr').should('have.length.greaterThan', 1) 
      
  })
})