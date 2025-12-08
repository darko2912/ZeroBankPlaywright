import { errors, expect, Locator, Page } from "@playwright/test";

export class NavBar {
    readonly page: Page
    readonly accountSummery: Locator
    readonly accountActivity: Locator
    readonly transferFunds: Locator
    readonly payBills: Locator
    readonly myMoneyMap: Locator
    readonly onlineStatments: Locator

    constructor(page: Page) {
        this.page = page
        this.accountSummery = page.locator('#account_summary_tab')
        this.accountActivity = page.locator('#account_activity_tab')
        this.transferFunds = page.locator('#transfer_funds_tab')
        this.payBills = page.locator('#pay_bills_tab')
        this.myMoneyMap = page.locator('#money_map_tab')
        this.onlineStatments = page.locator('#online_statements_tab')
    }

    //Method for navbar

    async clicOnTab(tabName: string) {
        switch (tabName) {
            case 'Account Summary':
                await this.accountSummery.click()
                break
            case 'Account Activity':
                await this.accountActivity.click()
                break
            case 'Transfer Funds':
                await this.transferFunds.click()
                break
            case 'Pay Bills':
                await this.payBills.click()
                break
            case 'My Money Map':
                await this.myMoneyMap.click()
                break
            case 'Online Statements':
                await this.onlineStatments.click()
                break
            default:
                throw new Error('This tab does not exist...')
        }
    }

}