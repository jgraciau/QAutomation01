import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../../src/pages/CheckoutPage';
import { TestHelpers, TestData } from '../../src/utils/TestHelpers';

/**
 * Suite de pruebas E2E para el flujo de Guest Checkout en OpenCart
 *
 * Casos de prueba:
 * - Compra de iMac y checkout completo
 * - Validación de datos de usuario
 * - Confirmación exitosa de orden
 */
test.describe('OpenCart Guest Checkout - End to End', () => {
  let checkoutPage: CheckoutPage;
  let testData: TestData;

  test.beforeEach(async ({ page }) => {
    checkoutPage = new CheckoutPage(page);
    testData = TestHelpers.loadTestData();

    // Navegar a la home
    await page.goto('/');

    console.log('URL actual:', page.url());
    console.log('Título de página:', await page.title());

    await expect(page).toHaveTitle('Your Store');
  });

  test('Compra de iMac y checkout completo', async ({ page }) => {
    // Step 1: Seleccionar Desktops / Mac y abrir la página de iMac
    await page.getByRole('link', { name: 'Desktops' }).click();
    await page.getByRole('link', { name: 'Mac (1)', exact: true }).click();
    await expect(page).toHaveURL(/path=20_27/);

    await page.getByText('iMac', { exact: true }).click();
    await expect(page).toHaveTitle(/iMac/);

    await page.getByRole('button', { name: 'Add to Cart', exact: true }).click();

    await expect(page.locator('.alert-success')).toContainText('Success: You have added');
    await expect(page.getByRole('button', { name: /1 item/i })).toBeVisible();

    // Step 2: Ir a checkout
    console.log('Haciendo clic en Checkout...');
    await page.getByRole('link', { name: 'Checkout' }).first().click();

    console.log('Esperando página de checkout...');
    await expect(page.locator('input[name="account"][value="guest"]')).toBeVisible();
    console.log('Página de checkout cargada, URL actual:', page.url());

    // Step 3: Seleccionar Guest Checkout
    await checkoutPage.selectGuestCheckout();

    // Step 4: Completar detalles de facturación
    const billingDetails = {
      ...testData.users.guest,
      ...testData.addresses.default,
    };
    await checkoutPage.fillBillingDetails(billingDetails);

    // Step 5: Seleccionar método de envío
    await checkoutPage.selectShippingMethod();

    // Step 6: Seleccionar método de pago
    await checkoutPage.selectPaymentMethod();

    // Step 7: Confirmar orden
    await checkoutPage.confirmOrder();

    const title = await checkoutPage.getPageTitle();
    await expect.soft(title).toContain('Your order has been placed!');
  });
});
