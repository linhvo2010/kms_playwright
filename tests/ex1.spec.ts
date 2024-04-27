import { test, expect } from '@playwright/test';

test('Verify make an order', async ({ page }) => {
// Action
// Login
await page.goto('https://rahulshettyacademy.com/client');
await page.locator('#userEmail').fill("rahulshetty@gmail.com");
await page.locator('#userPassword').fill("Iamking@000");
await page.locator('#login').click();

// Add iPhone 13 to cart
await page.locator("(//button[contains(text(),'Add To Cart')])[3]").click();

// Make the order
await page.locator(".btn.btn-custom[routerlink='/dashboard/cart']").click();
await page.locator("li[class='totalRow'] button[type='button']").click();
await page.getByPlaceholder('Select Country').fill("Viet");
await page.keyboard.press("Backspace");
await page.locator("span[class='ng-star-inserted']").click();
await page.locator(".btnn.action__submit.ng-star-inserted").click();
let orderId = await page.locator("label[class='ng-star-inserted']").textContent();

if (orderId) {
    orderId = orderId.replace(/\s+|\|/g, '');
} else {
console.error('Order ID not found!');
}

// Verify orderid
await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();
let text = await page.locator("tbody tr:nth-child(1) th:nth-child(1)").textContent();

// Assert
expect(text).toEqual(orderId);
});
