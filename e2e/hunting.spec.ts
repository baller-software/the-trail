import { test, expect, type Page } from '@playwright/test'

async function skipTypewriter(page: Page) {
  await page.waitForTimeout(300)
  await page.keyboard.press('Escape')
  await page.waitForTimeout(200)
}

async function navigateToTravel(page: Page) {
  await page.goto('/')
  await skipTypewriter(page)

  // Skip intro
  const introInput = page.getByRole('textbox', {
    name: 'Press Enter to continue',
  })
  await introInput.press('Enter')
  await skipTypewriter(page)

  // Buy supplies quickly
  const amounts = ['200', '100', '100', '100', '100']
  for (const amount of amounts) {
    const input = page.getByRole('textbox').first()
    await input.fill(amount)
    await input.press('Enter')
    await skipTypewriter(page)
  }

  // Start journey
  const beginInput = page.getByRole('textbox', {
    name: 'Press Enter to begin the journey',
  })
  await beginInput.press('Enter')
  await skipTypewriter(page)
}

test('hunting mechanic shows word and accepts input', async ({ page }) => {
  await navigateToTravel(page)

  // Choose option 3 to hunt
  await expect(page.locator('body')).toContainText('GO HUNTING')
  const choiceInput = page.getByRole('textbox', {
    name: 'Enter your choice',
  })
  await choiceInput.fill('3')
  await choiceInput.press('Enter')
  await skipTypewriter(page)

  // Should show hunting prompt with a target word
  await expect(page.locator('body')).toContainText('TYPE THE WORD')

  // Type a hunting word
  const huntInput = page.getByRole('textbox', {
    name: 'Type the word to shoot',
  })
  await huntInput.fill('BANG')
  await huntInput.press('Enter')
  await skipTypewriter(page)

  // Should show a result message
  await expect(page.locator('body')).toContainText(/SHOT|MISSED/)
})
