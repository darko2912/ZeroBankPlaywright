import { expect, Locator, Page } from "@playwright/test";

export class TransferFundsPage {
    readonly page: Page
    readonly fromAccountOption: Locator
    readonly toAccountOption: Locator
    readonly amountField: Locator
    readonly descField: Locator
    readonly continueButton: Locator
    readonly verifyMessage: Locator
    readonly submitButton: Locator
    readonly message: Locator

    constructor(page: Page) {
        this.page = page
        this.fromAccountOption = page.locator('#tf_fromAccountId')
        this.toAccountOption = page.locator('#tf_toAccountId')
        this.amountField = page.locator('#tf_amount')
        this.descField = page.locator('#tf_description')
        this.continueButton = page.locator('#btn_submit')
        this.verifyMessage = page.locator('.board-header')
        this.submitButton = page.locator('#btn_submit')
        this.message = page.locator('.alert-success')
    }

    async fillTransferForm(amount: string, desc: string) {
        await this.fromAccountOption.selectOption('3')
        await this.toAccountOption.selectOption('5')
        await this.amountField.fill(amount)
        await this.descField.fill(desc)
        await this.continueButton.click()
    }

    async verifyTransferForm() {
        await expect(this.verifyMessage).toContainText('Verify')
    }

    async clickOnSubmit() {
        await this.submitButton.click()
    }

    async successMessageDisplayed() {
        await expect(this.message).toBeVisible()
        await expect(this.message).toContainText('You successfully submitted your transaction')
    }

}