import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-object/HomePage'
import { LoginPage } from '../../page-object/LoginPage'

let homePage: HomePage
let loginPage: LoginPage

test.describe('Transfer funds', () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visitHomepage()
        await homePage.clickOnSignInButton()
        await loginPage.login('username', 'password')
        await page.waitForLoadState('networkidle')
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
    })

    test('Transfer money from acc to other acc', async ({ page }) => {
        await page.selectOption('#tf_fromAccountId', '3')
        await page.selectOption('#tf_toAccountId', '5')
        await page.fill('#tf_amount', '1000')
        await page.fill('#tf_description', 'Transfer money')
        await page.click('#btn_submit')

        const verifyMessage = page.locator('.board-header')
        await expect(verifyMessage).toContainText('Verify')
        await page.click('#btn_submit')
        const successMessage = page.locator('.alert-success')
        await expect(successMessage).toContainText('You successfully submitted your transaction')
    })
})