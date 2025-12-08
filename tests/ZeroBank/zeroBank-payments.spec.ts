import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-object/HomePage'
import { LoginPage } from '../../page-object/LoginPage'
import { NavBar } from '../../page-object/compnents/NavBar'
import { PaymentsPage } from '../../page-object/PymentsPage'

let homePage: HomePage
let loginPage: LoginPage
let navBar: NavBar
let paymentsPage: PaymentsPage

test.describe('Pay bill from account', () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        navBar = new NavBar(page)
        paymentsPage = new PaymentsPage(page)

        await homePage.visitHomepage()
        await homePage.clickOnSignInButton()
        await loginPage.login('username', 'password')
        await page.waitForLoadState('networkidle')
        await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
    })

    test('Payment successfully done from account', async ({ page }) => {
        await navBar.clicOnTab('Pay Bills')
        await paymentsPage.fillPaymentForm()
        await paymentsPage.paymentSuccessfullyDone()
    })
})