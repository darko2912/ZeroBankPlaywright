import { expect, test } from "@playwright/test";

test.describe.only('Visual Regression Example', () => {
    test('Screenshot Full Page', async ({ page }) => {
        await page.goto('https://www.example.com')
        expect(await page.screenshot()).toMatchSnapshot('homepage.png')
    })

    test('Screenshot One Element', async ({ page }) => {
        await page.goto('https://www.example.com')
        const titlePage = await page.getByRole("heading")
        expect(await titlePage.screenshot()).toMatchSnapshot('title_page.png')
    })
})