/// <reference types="Cypress" />

describe('Login suite', function () {
    before(function() {
        cy.fixture('users.json').as('users');
        cy.visitLogin();
        cy.contains('Welcome to Overpass', {timeout:30000}).should('be.visible');
        cy.login();
    });

    // after(function () {
    //     cy.logout();
    // });

    it('should succesfully navigate to contacts', function () {
        cy.contains(this.users.name);
        cy.contains('Contacts').click();
        cy.contains('Start Working').should('be.visible');
    });
});