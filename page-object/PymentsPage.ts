import { expect, Locator, Page } from "@playwright/test";

export class PaymentsPage {
    readonly page: Page
    readonly payeeOption: Locator
    readonly payeeDetailsButton: Locator
    readonly accountDetails: Locator
    readonly accountOption: Locator
    readonly amountField: Locator
    readonly dateField: Locator
    readonly descField: Locator
    readonly payButton: Locator
    readonly message: Locator

    constructor(page: Page) {
        this.page = page
        this.payeeOption = page.locator('#sp_payee')
        this.payeeDetailsButton = page.locator('#sp_get_payee_details')
        this.accountDetails = page.locator('#sp_payee_details')
        this.accountOption = page.locator('#sp_account')
        this.amountField = page.locator('#sp_amount')
        this.dateField = page.locator('#sp_date')
        this.descField = page.locator('#sp_description')
        this.payButton = page.locator('#pay_saved_payees')
        this.message = page.locator('#alert_content > span')
    }

    async fillPaymentForm() {
        await this.payeeOption.selectOption('apple')
        await this.payeeDetailsButton.click()
        await expect(this.accountDetails).toBeVisible()
        await expect(this.accountDetails).toContainText('48944145651315 Apple')
        await this.accountOption.selectOption('2')
        await this.amountField.fill('1000')
        await this.dateField.fill('2025-12-05')
        await this.payButton.click()
    }

    async paymentSuccessfullyDone() {
        await expect(this.message).toBeVisible()
        await expect(this.message).toContainText('The payment was successfully submitted')
    }
}