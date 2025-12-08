import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-object/HomePage'
import { LoginPage } from '../../page-object/LoginPage'
import { NavBar } from '../../page-object/compnents/NavBar'
import { FilterTransactionPage } from '../../page-object/FilterTransactionPage'

let homePage: HomePage
let loginPage: LoginPage
let navBar: NavBar
let filterTransactionPage: FilterTransactionPage

test.describe('Show transaction', () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        navBar = new NavBar(page)
        filterTransactionPage = new FilterTransactionPage(page)

        await homePage.visitHomepage()
        await homePage.clickOnSignInButton()
        await loginPage.login('username', 'password')
        await page.waitForLoadState('networkidle')
        await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
    })

    test('Account has approptiate transaction number', async ({ page }) => {
        await navBar.clicOnTab('Account Activity')
        await filterTransactionPage.selectAccount('2')
        await filterTransactionPage.transactionIsDisplayed(3)

        await filterTransactionPage.selectAccount('4')
        await filterTransactionPage.transactionIsDisplayed(2)

        await filterTransactionPage.selectAccount('6')
        await filterTransactionPage.noResultDisplayed()
    })
})