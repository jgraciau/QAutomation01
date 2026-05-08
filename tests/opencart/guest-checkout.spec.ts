import { test, expect, Locator } from '@playwright/test';

async function selectOptionByLabelOrFirst(
  locator: Locator,
  label: string
) {
  const option = locator.locator(`option:has-text("${label}")`);
  if (await option.count() > 0) {
    await locator.selectOption({ label });
    return;
  }

  const firstValue = await locator
    .locator('option:not(:has-text("---"))')
    .first()
    .getAttribute('value');
  if (firstValue) {
    await locator.selectOption(firstValue);
  }
}

test.describe('OpenCart Guest Checkout', () => {
  test('Completa el checkout como invitado hasta el mensaje de orden colocada', async ({ page }) => {
    await page.goto('common/home');
    await expect(page).toHaveTitle('Your Store');

    const addToCartButtons = page.getByRole('button', { name: 'Add to Cart' });
    await expect(addToCartButtons.first()).toBeVisible();
    await addToCartButtons.nth(1).click();

    await page.waitForTimeout(1000);
    await page.getByRole('link', { name: 'Checkout' }).first().click();

    await page.waitForURL('**/checkout/checkout');
    await page.waitForSelector('input[name="account"][value="guest"]');

    await page.check('input[name="account"][value="guest"]');
    await page.click('#button-account');

    await page.waitForSelector('#input-payment-firstname');
    await page.fill('#input-payment-firstname', 'Test');
    await page.fill('#input-payment-lastname', 'User');
    await page.fill('#input-payment-email', 'test.user@example.com');
    await page.fill('#input-payment-telephone', '0123456789');
    await page.fill('#input-payment-address-1', '123 Test Street');
    await page.fill('#input-payment-address-2', 'Suite 101');
    await page.fill('#input-payment-city', 'London');
    await page.fill('#input-payment-postcode', 'EC1A 1BB');

    const countrySelect = page.locator('#input-payment-country');
    await selectOptionByLabelOrFirst(countrySelect, 'United Kingdom');

    const zoneSelect = page.locator('#input-payment-zone');
    await page.waitForFunction(() => {
      const options = document.querySelectorAll('#input-payment-zone option');
      return Array.from(options).some((option) => option.textContent?.trim() !== '--- Please Select ---');
    });
    await selectOptionByLabelOrFirst(zoneSelect, 'Greater London');

    await page.check('#collapse-payment-address input[name="shipping_address"]');
    await page.click('#button-guest');

    await page.waitForSelector('#collapse-shipping-method input[type="radio"]');
    await page.locator('#collapse-shipping-method input[type="radio"]').first().check();
    await page.click('#button-shipping-method');

    await page.waitForSelector('#collapse-payment-method input[type="radio"]');
    await page.locator('#collapse-payment-method input[type="radio"]').first().check();
    await page.check('#collapse-payment-method input[name="agree"]');
    await page.click('#button-payment-method');

    await page.waitForSelector('#button-confirm');
    await page.click('#button-confirm');

    await page.waitForURL('**/checkout/success');
    await expect(page).toHaveTitle(/Your order has been placed!/);
    await expect(page.getByText('Your order has been placed!')).toBeVisible();
  });
});
