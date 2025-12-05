import { expect, Locator, Page } from "@playwright/test";

export class FeedbackPage {
    readonly page: Page
    readonly nameField: Locator
    readonly emailField: Locator
    readonly subjectField: Locator
    readonly commentField: Locator
    readonly clearButton: Locator
    readonly sendButton: Locator

    constructor(page: Page) {
        this.page = page
        this.nameField = page.locator('#name')
        this.emailField = page.locator('#email')
        this.subjectField = page.locator('#subject')
        this.commentField = page.locator('#comment')
        this.clearButton = page.locator('input[name="clear"]')
        this.sendButton = page.locator('input[name="submit"]')
    }

    //Methods for feedback

    async fillForm(
        name: string,
        email: string,
        subject: string,
        comment: string) {
        await this.nameField.fill(name)
        await this.emailField.fill(email)
        await this.subjectField.fill(subject)
        await this.commentField.fill(comment)
    }

    async clickOnCearButton() {
        await this.clearButton.click()
    }

    async clickOnSendButton() {
        await this.sendButton.click()
    }

    async assertClearFormField() {
        await expect(this.nameField).toBeEmpty()
        await expect(this.emailField).toBeEmpty()
        await expect(this.subjectField).toBeEmpty()
        await expect(this.commentField).toBeEmpty()
    }
}