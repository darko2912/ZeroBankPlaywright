import { expect, Locator, Page } from "@playwright/test";

export class FilterTransactionPage {
    readonly page: Page
    readonly accountOption: Locator
    readonly accountTransaction: Locator
    readonly noResult: Locator

    constructor(page: Page) {
        this.page = page
        this.accountOption = page.locator('#aa_accountId')
        this.accountTransaction = page.locator('#all_transactions_for_account tbody tr')
        this.noResult = page.locator('.well')
    }

    //Method for Filter Transaction

    async selectAccount(account: string) {
        await this.accountOption.selectOption(account)
    }

    async transactionIsDisplayed(num: number) {
        await expect(this.accountTransaction).toHaveCount(num)
    }

    async noResultDisplayed() {
        await expect(this.noResult).toBeVisible()
    }
}