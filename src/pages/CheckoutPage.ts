import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object para la página de Checkout de OpenCart
 * Encapsula toda la lógica de interacción con el flujo de checkout
 *
 * @class CheckoutPage
 * @example
 * const checkoutPage = new CheckoutPage(page);
 * await checkoutPage.selectGuestCheckout();
 * await checkoutPage.fillBillingDetails(userDetails);
 */
export class CheckoutPage {
  readonly page: Page;

  // Selectors - Checkout Account Step
  readonly guestCheckoutRadio: Locator;
  readonly continueButton: Locator;

  // Selectors - Billing Details Step
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly telephoneInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly cityInput: Locator;
  readonly postcodeInput: Locator;
  readonly countrySelect: Locator;
  readonly zoneSelect: Locator;
  readonly sameAddressCheckbox: Locator;
  readonly guestContinueButton: Locator;

  // Selectors - Shipping & Payment Steps
  readonly shippingMethodRadio: Locator;
  readonly shippingContinueButton: Locator;
  readonly paymentMethodRadio: Locator;
  readonly termsCheckbox: Locator;
  readonly paymentContinueButton: Locator;
  readonly confirmOrderButton: Locator;
  readonly successMessage: Locator;

  /**
   * Constructor de CheckoutPage
   * @param {Page} page - Instancia de la página de Playwright
   */
  constructor(page: Page) {
    this.page = page;

    // Account Step Selectors
    this.guestCheckoutRadio = page.locator('input[name="account"][value="guest"]');
    this.continueButton = page.locator('#button-account');

    // Billing Details Selectors
    this.firstNameInput = page.locator('#input-payment-firstname');
    this.lastNameInput = page.locator('#input-payment-lastname');
    this.emailInput = page.locator('#input-payment-email');
    this.telephoneInput = page.locator('#input-payment-telephone');
    this.address1Input = page.locator('#input-payment-address-1');
    this.address2Input = page.locator('#input-payment-address-2');
    this.cityInput = page.locator('#input-payment-city');
    this.postcodeInput = page.locator('#input-payment-postcode');
    this.countrySelect = page.locator('#input-payment-country');
    this.zoneSelect = page.locator('#input-payment-zone');
    this.sameAddressCheckbox = page.locator('#collapse-payment-address input[name="shipping_address"]');
    this.guestContinueButton = page.locator('#button-guest');

    // Shipping & Payment Selectors
    this.shippingMethodRadio = page.locator('input[name="shipping_method"]').first();
    this.shippingContinueButton = page.locator('#button-shipping-method');
    this.paymentMethodRadio = page.locator('input[name="payment_method"]').first();
    this.termsCheckbox = page.locator('input[name="agree"]');
    this.paymentContinueButton = page.locator('#button-payment-method');
    this.confirmOrderButton = page.locator('#button-confirm');
    this.successMessage = page.getByText('Your order has been placed!');
  }

  /**
   * Selecciona "Guest Checkout" en la pantalla inicial de checkout
   * @throws Error si los elementos no están disponibles
   */
  async selectGuestCheckout(): Promise<void> {
    await expect(this.guestCheckoutRadio).toBeVisible();
    await this.guestCheckoutRadio.check();
    await expect(this.guestCheckoutRadio).toBeChecked();

    await expect(this.continueButton).toBeVisible();
    await expect(this.continueButton).toBeEnabled();
    await this.continueButton.click();

    await expect(this.firstNameInput).toBeVisible();
  }

  /**
   * Completa los detalles de facturación del cliente
   * @param {Object} details - Objeto con los datos de facturación
   * @param {string} details.firstName - Nombre del cliente
   * @param {string} details.lastName - Apellido del cliente
   * @param {string} details.email - Email del cliente
   * @param {string} details.telephone - Teléfono del cliente
   * @param {string} details.address1 - Dirección principal
   * @param {string} details.address2 - Dirección secundaria (opcional)
   * @param {string} details.city - Ciudad
   * @param {string} details.postcode - Código postal
   * @param {string} details.country - País
   * @param {string} details.zone - Provincia/Estado
   * @throws Error si algún campo no se puede completar
   */
async fillBillingDetails(details: {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  country: string;
  zone: string;
}): Promise<void> {
  await expect(this.firstNameInput).toBeVisible();

  await this.firstNameInput.fill(details.firstName);
  await this.lastNameInput.fill(details.lastName);
  await this.emailInput.fill(details.email);
  await this.telephoneInput.fill(details.telephone);
  await this.address1Input.fill(details.address1);
  await this.address2Input.fill(details.address2);
  await this.cityInput.fill(details.city);
  await this.postcodeInput.fill(details.postcode);

  // Select country
  await this.countrySelect.selectOption({ label: details.country });

  // Wait until the expected zone is available
  await expect.poll(
    async () => {
      const options = await this.zoneSelect.locator('option').allTextContents();
      return options.map(option => option.trim());
    },
    {
      timeout: 15000,
      message: `La zona "${details.zone}" no fue cargada para el país "${details.country}"`,
    }
  ).toContain(details.zone);

  // Select zone
  await this.zoneSelect.selectOption({ label: details.zone });

  // Validate selected zone
  await expect(this.zoneSelect.locator('option:checked')).toHaveText(details.zone);

  // Use same address for shipping
  await expect(this.sameAddressCheckbox).toBeVisible();
  if (!(await this.sameAddressCheckbox.isChecked())) {
    await this.sameAddressCheckbox.check();
  }

  await expect(this.guestContinueButton).toBeVisible();
  await expect(this.guestContinueButton).toBeEnabled();
  await this.guestContinueButton.click();

  // Verify checkout advanced to shipping step
  await expect(this.page.locator('#collapse-shipping-method')).toBeVisible({
    timeout: 20000,
  });
}


  /**
   * Selecciona el método de envío disponible
   * @throws Error si el elemento no se puede seleccionar
   */
  async selectShippingMethod(): Promise<void> {
    await expect(this.shippingMethodRadio).toBeVisible();
    await this.shippingMethodRadio.check();

    await expect(this.shippingContinueButton).toBeVisible();
    await expect(this.shippingContinueButton).toBeEnabled();
    await this.shippingContinueButton.click();

    await expect(this.paymentMethodRadio).toBeVisible();
  }

  /**
   * Selecciona el método de pago y acepta términos
   * @throws Error si no se pueden aceptar los términos
   */
  async selectPaymentMethod(): Promise<void> {
    await expect(this.paymentMethodRadio).toBeVisible();
    await this.paymentMethodRadio.check();

    await expect(this.termsCheckbox).toBeVisible();
    await this.termsCheckbox.check();

    await expect(this.paymentContinueButton).toBeVisible();
    await expect(this.paymentContinueButton).toBeEnabled();
    await this.paymentContinueButton.click();

    await expect(this.confirmOrderButton).toBeVisible();
  }

  /**
   * Confirma el pedido y completa el checkout
   * @returns {Promise<void>}
   * @throws Error si el pedido no se puede confirmar
   */
  async confirmOrder(): Promise<void> {
    await expect(this.confirmOrderButton).toBeVisible();
    await expect(this.confirmOrderButton).toBeEnabled();
    await this.confirmOrderButton.click();

    // Wait for success page
    await this.page.waitForURL('**/index.php?route=checkout/success');
    await expect(this.successMessage).toBeVisible();
  }

  /**
   * Obtiene el título de la página
   * @returns {Promise<string>} Título de la página actual
   */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }
}