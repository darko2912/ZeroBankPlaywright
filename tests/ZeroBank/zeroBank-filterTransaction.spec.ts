import { test, expect } from '@playwright/test'

test.describe('Show transaction', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
        await expect(page).toHaveTitle('Zero - Log in')
        await page.fill('#user_login', 'username')
        await page.fill('#user_password', 'password')
        await page.click('input[type="submit"]')
        await page.waitForLoadState('networkidle')

        await page.goto('http://zero.webappsecurity.com/bank/account-activity.html')
    })

    test('Account has approptiate transaction number', async ({ page }) => {
        await page.selectOption('#aa_accountId', '2')

        const checkingAccount = await page.locator('#all_transactions_for_account tbody tr')
        await expect(checkingAccount).toHaveCount(3)

        await page.selectOption('#aa_accountId', '4')

        const loanAccount = await page.locator('#all_transactions_for_account tbody tr')
        await expect(loanAccount).toHaveCount(2)

        await page.selectOption('#aa_accountId', '6')

        const noResult = await page.locator('.well')
        await expect(noResult).toBeVisible()
    })
})