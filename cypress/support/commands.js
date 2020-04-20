/// <reference types="Cypress" />

Cypress.Commands.add('apiLogin', ()=>{
    cy.request({
        method: 'POST',
        url: Cypress.env('api_server') + 'auth/',
        form: false,
        headers: {
            "Content-Type": "application/json"},
        body: {
            "procedure": "auth.login",
            "args": [
                {
                    "reqId": "725b0f20-78b7-11ea-8ae0-0bde63b4c79a"
                },
                {
                    "username": "demo+clientQ@overpass.com",
                    "passwordHash": "0cef1fb10f60529028a71f58e54ed07b"
                },
                true
            ]
        }
    })
        .then((res) => {
            expect(res.status).to.eq(200);
            cy.setCookie('auth_key', res.body.args[0].data.authToken);
        });
});

Cypress.Commands.add('login', (user, pass) => {
    cy.fixture('users.json').then ((users) =>{
        const $btn = 'au-target popup_container small';
        cy.get('[ref="emailInput"]', {timeout:10000}).type(user + '{enter}');
        cy.get('[ref="passwordInput"]', {timeout:10000}).type(pass);

        // Click login and handle "alreadly logged in" prompt
        cy.get('[type=\'submit\']').click({timeout:10000}).then(()=> {
            cy.get('[class="spinner spin_in_btn"]').should('not.visible');
            cy.wait(1500);
            cy.get("body").then($body => {
                if ($body.find("[class='au-target popup_container small']", {timeout:5000}).length > 0) {
                    cy.log("Found prompt");
                    cy.get("[class='au-target popup_container small'] span").first()
                        .click({timeout:10000});
                }
            });
        });
        cy.get('[class="spinner spin_in_btn"]').should('not.visible');
    });
});


Cypress.Commands.add('logout', () => {
        cy.get('.user-box-container.au-target').should('be.visible').click().then(()=>{
            cy.get('li .pad_2.bd-b_1.dd_item.au-target').should('be.visible').click();
        });
        cy.clearLocalStorage();
});


Cypress.Commands.add('visitLogin', ()=> {
    cy.viewport(1366, 768);
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('/auth/login/', {
        onBeforeLoad: win => {
            win.sessionStorage.clear();
        },
        timeout: 15000
    });
});

Cypress.Commands.add('nav', ()=> {
    function campaigns() {
        cy.get('.au-target.tab-btn_component.dashboard').click();
    }
    function contacts() {
        cy.get('.au-target.tab-btn_component.crm').click();
    }
    function marketplace() {
        cy.get('.au-target.tab-btn_component.marketplace').click();
    }
    function marketplace() {
        cy.get('.au-target.tab-btn_component.workforce').click();
    }

    return this
});


