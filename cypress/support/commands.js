/// <reference types="Cypress" />
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('apiLogin', ()=>{
    cy.request({
        method: 'POST',
        url: 'https://api-iam.intercom.io/messenger/web/ping',
        headers: {
            "Content-Type": "application/json",
            "accept": "*/*",
            "origin": "https://e2e.app.slot.overpass.com"},
        body: {
            "app_id": "psx0qvex",
            "v": "3",
            "g": "45fc3c127730946b000347f9817935fee2362bbf",
            "s": "9136fe67-7158-4859-8c19-915b5e38416b",
            "user_data": "{\"email\":\"demo+clientq@overpass.com\",\"name\":\"Client User\",\"company\":{},\"userId\":\"user::b9f69deb-46f9-41bf-801c-4849f1779341\",\"System-Version\":\"0.70.0\",\"Number-of-environments\":1,\"User-type\":\"client\",\"Role\":\"admin\",\"Current environment\":\"e2e-Transilvania Cluj\"}"
        }
    })
        .then((res) => {
            Cypress.log({message: res.body});
            expect(res.status).to.eq(200);
        });
});

Cypress.Commands.add('login', () => {
    cy.fixture('users.json').then ((users) =>{
        cy.get('[ref="emailInput"]', {timeout:10000}).type(users.username + '{enter}');
        cy.get('[ref="passwordInput"]', {timeout:10000}).type(users.password + '{enter}');
        cy.get('body', {timeout:10000}).then(($body) => {
            if ($body.find('.au-target.yes.fl_short.go_bg')) {
                cy.get('.au-target.yes.fl_short.go_bg', {timeout:10000}).click();
            } else
                {return $body}
        });
        // cy
        //     .get('.au-target.yes.fl_short.go_bg').click()
        //     .catch((err) => {
        //         Cypress.log({"mesasage": "pop-up not present"})
        //         });
    });
});

Cypress.Commands.add('logout', () => {
    cy.get('.ub_info.angle-down').click().then(()=>{
        cy.contains('logout()').click();
    });
});

Cypress.Commands.add('waitForSpinner', ()=> {
    cy.contains('spin 2s').should.not('be.visible');
});

Cypress.Commands.add('visitLogin', ()=> {
    cy.visit('/auth/login/', {
        onBeforeLoad: win => {
            win.sessionStorage.clear();
        },
        timeout: 25000
    });
    cy.viewport('macbook-15');
    cy.clearCookies();
    // cy.get('.nav__link-enhanced a').click(); click Login button on hPage
});
