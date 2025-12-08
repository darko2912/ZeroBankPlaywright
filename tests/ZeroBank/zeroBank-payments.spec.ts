import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-object/HomePage'
import { LoginPage } from '../../page-object/LoginPage'

let homePage: HomePage
let loginPage: LoginPage

test.describe('Pay bill from account', () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visitHomepage()
        await homePage.clickOnSignInButton()
        await loginPage.login('username', 'password')
        await page.waitForLoadState('networkidle')
        await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html')
    })

    test('Payment successfully done from account', async ({ page }) => {
        await page.selectOption('#sp_payee', 'apple')
        await page.click('#sp_get_payee_details')

        const accDetails = page.locator('#sp_payee_details')
        await expect(accDetails).toContainText('48944145651315')

        await page.selectOption('#sp_account', '2')
        await page.fill('#sp_amount', '1000')
        await page.fill('#sp_date', '2025-12-05')
        await page.fill('#sp_description', 'Test payment')
        await page.click('#pay_saved_payees')

        const successMessage = page.locator('#alert_content > span')
        await expect(successMessage).toContainText('The payment was successfully submitted')
    })
})