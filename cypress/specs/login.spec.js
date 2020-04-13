/// <reference types="Cypress" />

describe('Login suite', function () {
    before(function() {
        cy.fixture('users.json').as('users').then(()=> {
            cy.visitLogin();
            cy.contains('Welcome to Overpass', {timeout:15000}).should('be.visible');
            cy.login(this.users.client1.username, this.users.client1.password);
        })
    });

    after(function () {
        cy.logout();
    });

    it('Dispaly select a campaign error message', function () {
        // Check Client is logged in
        cy.contains(this.users.client1.name);
    //     // Contains
    //     cy.get('.au-target.tab-btn_component.crm').click();
    //     //Click Call button
    //     cy.get("span .btn.circle_btn.call_btn.au-target").should('be.visible');
    //     cy.get('.btn.circle_btn.call_btn.au-target .fa.fa-phone').click().then(()=> {
    //         cy.get('.au-target.arrow-panel.arrow-pos-top.arrow-align-right.arrow-size-l').should('be.visible');
    //         cy.get('.call-btn-wrapper button').click();
    //     });
    //     cy.contains('Please select a campaign').should('be.visible');
    });
});