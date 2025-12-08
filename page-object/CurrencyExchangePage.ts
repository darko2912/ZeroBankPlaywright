import { expect, Locator, Page } from "@playwright/test";

export class CurrencyExchangePage {
    readonly page: Page
    readonly currencyOption: Locator
    readonly sellRate: Locator
    readonly amountField: Locator
    readonly slectedCurrencyRadioButton: Locator
    readonly calculateCostsButton: Locator
    readonly conversionAmount: Locator
    readonly purchaseButton: Locator
    readonly message: Locator

    constructor(page: Page) {
        this.page = page
        this.currencyOption = page.locator('#pc_currency')
        this.sellRate = page.locator('#sp_sell_rate')
        this.amountField = page.locator('#pc_amount')
        this.slectedCurrencyRadioButton = page.locator('#pc_inDollars_false')
        this.calculateCostsButton = page.locator('#pc_calculate_costs')
        this.conversionAmount = page.locator('#pc_conversion_amount')
        this.purchaseButton = page.locator('#purchase_cash')
        this.message = page.locator('#alert_content')
    }

    //Method for Currency Exchange

    async selectCurrency() {
        await this.currencyOption.selectOption('EUR')
    }

    async appropriateSellRate() {
        await expect(this.sellRate).toContainText('1 euro (EUR)')
    }

    async inputAmount() {
        await this.amountField.fill('1000')
    }

    async clickOnCalculateButton() {
        await this.slectedCurrencyRadioButton.click()
        await this.calculateCostsButton.click()
    }

    async successConversionAmount() {
        await expect(this.conversionAmount).toContainText('1000.00 euro (EUR)')
    }

    async clickOnPurchaseButton() {
        await this.purchaseButton.click()
    }

    async successPurchase() {
        await expect(this.message).toContainText('Foreign currency cash was successfully purchased')
    }
}