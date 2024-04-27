import { test, expect } from '@playwright/test';

// Pre-condition
test.beforeAll('Login with admin account & create an user', async ({ browser }) => {
    // Set timeout for this hook.
    test.setTimeout(600000);

    const context = await browser.newContext();
    const page = await context.newPage();

    // Login with admin account
    await page.goto('https://opensource-demo.orangehrmlive.com');
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.locator("//button[@type='submit']").click();

    // Create new employee
    await page.getByRole('link', { name: 'PIM' }).click();
    await page.locator("//button[normalize-space()='Add']").click();
    await page.getByPlaceholder('First Name').fill('Linh');
    await page.getByPlaceholder('Middle Name').fill('Thuy');
    await page.getByPlaceholder('Last Name').fill('Vo');
    await page.locator("button[type='submit']").click();
    page.waitForTimeout(5000);
    
    // Create new account
    await page.locator('//li[1]//a[1]//span[1]').click();
    await page.locator("//button[normalize-space()='Add']").click();
    await page.getByText('-- Select --').first().click();
    await page.getByRole('option', { name: 'Admin' }).click();
    await page.getByText('-- Select --').click();
    await page.getByRole('option', { name: 'Enabled' }).click();
    await page.getByPlaceholder("Type for hints...").fill("Linh");
    await page.getByRole('option', { name: 'Linh Thuy Vo' }).click();
    await page.locator("(//input[@class='oxd-input oxd-input--active'])[2]").fill("Linnie");
    await page.locator("(//input[@type='password'])[1]").fill("Linnie123");
    await page.locator("(//input[@type='password'])[2]").fill("Linnie123");
    await page.locator("button[type='submit']").click();
});

// TC01: Verify that the user can log in successfully when provided the username and password correctly
test('Verify login successfully with valid username & password', async ({page}) => {
    // Action
    // Login with valid username & password
    await page.goto('https://opensource-demo.orangehrmlive.com');
    await page.getByPlaceholder("Username").fill("Linnie");
    await page.getByPlaceholder("Password").fill("Linnie123");
    await page.locator("//button[@type='submit']").click();

    // Assert
    await expect(page).toHaveURL(/dashboard/);
})

// TC02: Verify that the user can not log in successfully when providing username is empty
test('Verify login failed with empty username', async ({page}) => {
    // Action
    // Login with empty username & valid password
    await page.goto('https://opensource-demo.orangehrmlive.com');
    await page.getByPlaceholder("Password").fill("Linnie123");
    await page.locator("//button[@type='submit']").click();

    // Assert
    const errorMessage = await page.locator(".oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message").textContent();
    expect(errorMessage?.includes("Required")).toBeTruthy();
})