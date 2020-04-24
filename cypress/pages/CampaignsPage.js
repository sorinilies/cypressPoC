const CampaignLocators = {
    activeTab: '[href="/environment/dashboard/"]',
    inactiveTab: '[href="/environment/dashboard/inactive"]',
    draftTab: '[href="/environment/dashboard/draft"]'

};


class CampaignsPage{
    visit() {
        cy.visit('/environment/dashboard');
    }

    clickActiveTab() {
        return cy.get(CampaignLocators.activeTab).click();
    }

    clickInactiveTab() {
        return cy.get(CampaignLocators.inactiveTab).click();
    }

    clickDraftTab() {
        return cy.get(CampaignLocators.draftTab).click();
    }

}

export default CampaignsPage;
