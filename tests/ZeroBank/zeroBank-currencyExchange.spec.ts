import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-object/HomePage'
import { LoginPage } from '../../page-object/LoginPage'

let homePage: HomePage
let loginPage: LoginPage

test.describe('Change money', () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visitHomepage()
        await homePage.clickOnSignInButton()
        await loginPage.login('username', 'password')
        await page.waitForLoadState('networkidle')
        await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html')
    })

    test('Foreing currancy cash successfully change', async ({ page }) => {
        await page.click('text="Purchase Foreign Currency"')
        await page.selectOption('#pc_currency', 'EUR')

        const sellRate = page.locator('#sp_sell_rate')
        await expect(sellRate).toContainText('1 euro (EUR)')

        await page.fill('#pc_amount', '1000')
        await page.click('#pc_inDollars_false')
        await page.click('#pc_calculate_costs')

        const conversionAmount = page.locator('#pc_conversion_amount')
        await expect(conversionAmount).toContainText('1000.00 euro (EUR)')

        await page.click('#purchase_cash')

        const successmMessage = page.locator('#alert_content')
        await expect(successmMessage).toContainText('Foreign currency cash was successfully purchased')
    })
})