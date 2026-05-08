import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../../src/pages/CheckoutPage';

/**
 * Suite de pruebas E2E para el flujo de Guest Checkout en OpenCart
 *
 * Casos de prueba:
 * - Flujo completo de checkout como invitado
 * - Validación de datos de usuario
 * - Confirmación exitosa de orden
 */
test.describe('OpenCart Guest Checkout - End to End', () => {
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    checkoutPage = new CheckoutPage(page);

    // Navegar a la home
    await page.goto('/');

    console.log('URL actual:', page.url());
    console.log('Título de página:', await page.title());

    await expect(page).toHaveTitle('Your Store');
  });

  test('E2E: Completa el flujo de checkout como invitado hasta confirmación de orden', async ({
    page,
  }) => {
    // Step 1: Agregar producto al carrito
    const addToCartButtons = page.getByRole('button', { name: 'Add to Cart' });

    await expect(addToCartButtons.first()).toBeVisible();
    await addToCartButtons.nth(1).click();

    // Step 2: Ir a checkout
    console.log('Haciendo clic en Checkout...');
    await page.getByRole('link', { name: 'Checkout' }).first().click();

    console.log('Esperando página de checkout...');
    await expect(page.locator('input[name="account"][value="guest"]')).toBeVisible();
    console.log('Página de checkout cargada, URL actual:', page.url());

    // Step 3: Seleccionar Guest Checkout
    await checkoutPage.selectGuestCheckout();

    // Step 4: Completar detalles de facturación
    await checkoutPage.fillBillingDetails({
      firstName: 'Test',
      lastName: 'User',
      email: 'test.user@example.com',
      telephone: '0123456789',
      address1: '123 Test Street',
      address2: 'Suite 101',
      city: 'London',
      postcode: 'EC1A 1BB',
      country: 'United Kingdom',
      zone: 'Greater London',
    });

    // Step 5: Seleccionar método de envío
    await checkoutPage.selectShippingMethod();

    // Step 6: Seleccionar método de pago
    await checkoutPage.selectPaymentMethod();

    // Step 7: Confirmar orden
    await checkoutPage.confirmOrder();

    // Verificar que llegamos a la página de éxito
    const title = await checkoutPage.getPageTitle();
    await expect.soft(title).toContain('Your order has been placed!');
  });
});
