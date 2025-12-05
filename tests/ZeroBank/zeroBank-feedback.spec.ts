import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-object/HomePage'
import { FeedbackPage } from '../../page-object/FeedbackPage'

let homepage: HomePage
let feedbackPage: FeedbackPage

test.describe('Submit feedback', () => {
    test.beforeEach(async ({ page }) => {
        homepage = new HomePage(page)
        feedbackPage = new FeedbackPage(page)

        homepage.visitHomepage()
    })

    test('All fields are empty when user click clear button', async ({ page }) => {
        await homepage.clickOnFeedbackButton()
        await page.waitForURL('http://zero.webappsecurity.com/feedback.html')
        await feedbackPage.fillForm(
            'Test name',
            'test@mail.com',
            'Test feedback',
            'Test comment'
        )
        await feedbackPage.clickOnCearButton()

        await feedbackPage.assertClearFormField()
    })

    test('Submit successfully done and feedback recived', async ({ page }) => {
        await homepage.clickOnFeedbackButton()
        await page.waitForURL('http://zero.webappsecurity.com/feedback.html')
        await feedbackPage.fillForm(
            'Test name',
            'test@mail.com',
            'Test feedback',
            'Test comment'
        )
        await feedbackPage.clickOnSendButton()
        await feedbackPage.assertFeedbackRecived()
    })
})