import { test, expect } from '@playwright/test'

test.describe('Change money', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
        await expect(page).toHaveTitle('Zero - Log in')
        await page.fill('#user_login', 'username')
        await page.fill('#user_password', 'password')
        await page.click('input[type="submit"]')
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