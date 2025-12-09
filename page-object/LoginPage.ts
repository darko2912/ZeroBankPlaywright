import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class LoginPage extends AbstractPage {

    //Define selectors
    readonly usernameField: Locator
    readonly passwordField: Locator
    readonly submitButton: Locator
    readonly errorMessage: Locator

    //Init selectors
    constructor(page: Page) {
        super(page)
        this.usernameField = page.locator('#user_login')
        this.passwordField = page.locator('#user_password')
        this.submitButton = page.locator('input[type="submit"]')
        this.errorMessage = page.locator('.alert-error')
    }

    //Methods for login

    async login(username: string, password: string) {
        await this.usernameField.fill(username)
        await this.passwordField.fill(password)
        await this.submitButton.click()
    }

    async assertErrorMessage() {
        await expect(this.errorMessage).toBeVisible()
        await expect(this.errorMessage).toContainText('Login and/or password are wrong')
    }
}