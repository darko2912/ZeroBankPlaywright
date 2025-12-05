import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page
    readonly signInButton: Locator
    readonly logoutButton: Locator
    readonly userMenu: Locator
    readonly searchField: Locator
    readonly feedbackButton: Locator

    constructor(page: Page) {
        this.page = page
        this.signInButton = page.locator('#signin_button')
        this.logoutButton = page.locator('#logout_link')
        this.userMenu = page.locator('.dropdown a.dropdown-toggle', { hasText: 'username' })
        this.searchField = page.locator('#searchTerm')
        this.feedbackButton = page.locator('#feedback')
    }

    //Methods for homepage

    async visitHomepage() {
        await this.page.goto('http://zero.webappsecurity.com/index.html')
    }

    async clickOnSignInButton() {
        await this.signInButton.click()
    }

    async assertTitleWeb() {
        await expect(this.page).toHaveTitle('Zero - Log in')
    }

    async signInButtonIsVisible() {
        await expect(this.signInButton).toBeVisible()
    }

    async signInButtonIsNotVisible() {
        await expect(this.signInButton).not.toBeVisible()
    }

    async clickOnLogoutButton() {
        await this.userMenu.click()
        await this.logoutButton.click()
    }

    async inputSearch(searchText: string) {
        await this.searchField.fill(searchText)
    }

    async clickOnFeedbackButton() {
        await this.feedbackButton.click()
    }
}