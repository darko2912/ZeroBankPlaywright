import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-object/HomePage'
import { LoginPage } from '../../page-object/LoginPage'
import { NavBar } from '../../page-object/compnents/NavBar'
import { TransferFundsPage } from '../../page-object/TransferFundsPage'

let homePage: HomePage
let loginPage: LoginPage
let navBar: NavBar
let transferFundsPage: TransferFundsPage

test.describe('Transfer funds', () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        navBar = new NavBar(page)
        transferFundsPage = new TransferFundsPage(page)

        await homePage.visitHomepage()
        await homePage.clickOnSignInButton()
        await loginPage.login('username', 'password')
        await page.waitForLoadState('networkidle')
        await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
    })

    test('Transfer money from acc to other acc', async ({ page }) => {
        await navBar.clicOnTab('Transfer Funds')
        await transferFundsPage.fillTransferForm('5000', 'test transfer')
        await transferFundsPage.verifyTransferForm()
        await transferFundsPage.clickOnSubmit()
        await transferFundsPage.successMessageDisplayed()
    })
})