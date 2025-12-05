import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-object/HomePage'

let homepage: HomePage
test.beforeEach(async ({ page }) => {
    homepage = new HomePage(page)
})

test.describe('Search function', () => {
    test('Search give us appropriate results', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await homepage.inputSearch('Banking')
        await page.keyboard.press('Enter')

        const link = await page.locator('ul > li > a')
        await expect(link.nth(0)).toContainText("Banking");
        await expect(link.nth(1)).toContainText("Banking");
    })
})