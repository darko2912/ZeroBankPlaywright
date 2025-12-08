import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-object/HomePage'
import { LoginPage } from '../../page-object/LoginPage'
import { NavBar } from '../../page-object/compnents/NavBar'
import { CurrencyExchangePage } from '../../page-object/CurrencyExchangePage'

let homePage: HomePage
let loginPage: LoginPage
let navBar: NavBar
let currencyExchangePage: CurrencyExchangePage

test.describe('Change money', () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        navBar = new NavBar(page)
        currencyExchangePage = new CurrencyExchangePage(page)

        await homePage.visitHomepage()
        await homePage.clickOnSignInButton()
        await loginPage.login('username', 'password')
        await page.waitForLoadState('networkidle')
        await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
    })

    test('Foreing currancy cash successfully change', async ({ page }) => {
        await navBar.clicOnTab('Pay Bills')
        await page.click('text="Purchase Foreign Currency"')
        await currencyExchangePage.selectCurrency()
        await currencyExchangePage.appropriateSellRate()
        await currencyExchangePage.inputAmount()
        await currencyExchangePage.clickOnCalculateButton()
        await currencyExchangePage.successConversionAmount()
        await currencyExchangePage.clickOnPurchaseButton()
        await currencyExchangePage.successPurchase()
    })
})