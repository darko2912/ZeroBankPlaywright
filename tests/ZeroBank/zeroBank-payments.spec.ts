import { test, expect } from '@playwright/test'

test.describe('Pay bill from account', () => {
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