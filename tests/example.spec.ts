import { test, expect } from "@playwright/test"

test("Prvi test", async ({ page }) => {
    await page.goto("https://www.example.com")
    const pageTitle = page.locator("h1")
    await expect(pageTitle).toContainText("Example Domain")
})

test.skip("Test za kliktanje", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/")
    await page.click("#login-button")

    const errorMessage = page.locator("[data-test='error']")
    await expect(errorMessage).toContainText("Epic sadface: Username is required")
})


test.describe("Moj prvi paket testova", () => {
    test("Input test", async ({ page }) => {
        await page.goto("https://www.saucedemo.com/")
        await page.fill("#user-name", "Neki user")
        await page.fill("#password", "Neki password")
        await page.click("#login-button")

        const errorMessage = page.locator("[data-test='error']")
        await expect(errorMessage).toContainText("Epic sadface: Username and password do not match any user in this service")
    })

    test("Asertacije @myTag", async ({ page }) => {
        await page.goto("https://www.saucedemo.com/")

        const usernameField = await page.locator("#user-name")
        await expect(usernameField).toBeVisible()
        await expect(usernameField).toHaveAttribute("placeholder", "Username")

        const passwordField = await page.locator("#password")
        await expect(passwordField).toBeVisible()
        await expect(passwordField).toHaveAttribute("placeholder", "Password")

        const loginButton = await page.locator(".submit-button")
        await expect(loginButton).toBeVisible()
        await expect(loginButton).toHaveValue("Login")
    })
})

test.describe.parallel.only("Hooks", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.saucedemo.com/")
    })

    test("Screenshot cele strane", async ({ page }) => {
        await page.screenshot({ path: "screenshot.png", fullPage: true })
    })

    test("Screenshot samo jendog elementa", async ({ page }) => {
        const element = await page.locator(".login_logo")
        await element.screenshot({ path: "screenshot_jednog_elementa.png" })
    })
})
