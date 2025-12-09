import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-object/LoginPage'
import { HomePage } from '../../page-object/HomePage'

let loginPage: LoginPage
let homepage: HomePage

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homepage = new HomePage(page)

    await homepage.visitHomepage()
})

test.describe.parallel('Negative test cases', () => {
    test('Login with empty field', async ({ page }) => {
        await homepage.clickOnSignInButton()
        await homepage.assertTitleWeb()
        await page.click('input[type="submit"]')

        await loginPage.assertErrorMessage()
    })

    test('Login with invalid credentials', async ({ page }) => {
        await homepage.clickOnSignInButton()
        await homepage.assertTitleWeb()
        await loginPage.login('neki user', 'neki pass')

        await loginPage.assertErrorMessage()
    })

    test('Login with invalid username', async ({ page }) => {
        await homepage.clickOnSignInButton()
        await homepage.assertTitleWeb()
        await loginPage.login('neki user', 'password')

        await loginPage.assertErrorMessage()
    })

    test('Login with invalid password', async ({ page }) => {
        await homepage.clickOnSignInButton()
        await homepage.assertTitleWeb()
        await loginPage.login('username', 'neki pass')

        await loginPage.assertErrorMessage()
    })
})

test.describe('Positive test cases', () => {
    test('Login with valid credentials', async ({ page }) => {
        await homepage.clickOnSignInButton()
        await homepage.assertTitleWeb()
        await loginPage.login('username', 'password')
        await loginPage.wait(3000)

        await page.goto('http://zero.webappsecurity.com/index.html')
        await homepage.signInButtonIsNotVisible()
    })

    test('Logout from zero bank app', async ({ page }) => {
        await homepage.clickOnSignInButton()
        await homepage.assertTitleWeb()
        await loginPage.login('username', 'password')
        await loginPage.wait(3000)

        await page.goto('http://zero.webappsecurity.com/index.html')
        await homepage.clickOnLogoutButton()

        await homepage.signInButtonIsVisible()
    })
})