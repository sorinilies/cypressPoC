const MarketplaceLocators = {
    suggestedTab: '',
    handPickedTab: '',
    jobApplicants: ''
};


class MarketplacePage{
    visit() {
        cy.visit('/environment/marketplace');
    }

    clickSuggestedTab () {
        return cy.get(MarketplaceLocators.suggestedTab).click();
    }

    clickSuggestedTab () {
        return cy.get(MarketplaceLocators.suggestedTab).click();
    }

    clickSuggestedTab () {
        return cy.get(MarketplaceLocators.suggestedTab).click();
    }
}

export default MarketplacePage;
