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
  private readonly DEFAULT_TIMEOUT = 30000;

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
    this.shippingMethodRadio = page.locator('#collapse-shipping-method input[type="radio"]').first();
    this.shippingContinueButton = page.locator('#button-shipping-method');
    this.paymentMethodRadio = page.locator('#collapse-payment-method input[type="radio"]').first();
    this.termsCheckbox = page.locator('#collapse-payment-method input[name="agree"]');
    this.paymentContinueButton = page.locator('#button-payment-method');
    this.confirmOrderButton = page.locator('#button-confirm');
    this.successMessage = page.getByText('Your order has been placed!');
  }

  /**
   * Selecciona "Guest Checkout" en la pantalla inicial de checkout
   * @throws Error si los elementos no están disponibles
   */
  async selectGuestCheckout(): Promise<void> {
    await this.guestCheckoutRadio.waitFor({ timeout: this.DEFAULT_TIMEOUT });
    await this.guestCheckoutRadio.check();
    await this.continueButton.click();
    await this.firstNameInput.waitFor({ timeout: this.DEFAULT_TIMEOUT });
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
    // Fill all text inputs
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.emailInput.fill(details.email);
    await this.telephoneInput.fill(details.telephone);
    await this.address1Input.fill(details.address1);
    await this.address2Input.fill(details.address2);
    await this.cityInput.fill(details.city);
    await this.postcodeInput.fill(details.postcode);

    // Select country - wait for population before selecting zone
    await this.countrySelect.selectOption({ label: details.country });

    // Wait for zone to be populated after country selection
    await this.page.waitForFunction(() => {
      const options = document.querySelectorAll('#input-payment-zone option');
      return Array.from(options).some((option) => option.textContent?.trim() !== '--- Please Select ---');
    }, { timeout: this.DEFAULT_TIMEOUT });

    await this.zoneSelect.selectOption({ label: details.zone });

    // Use same address for shipping
    await this.sameAddressCheckbox.check();
    await this.guestContinueButton.click();

    // Verify we moved to shipping step
    await this.shippingMethodRadio.waitFor({ timeout: this.DEFAULT_TIMEOUT });
  }

  /**
   * Selecciona el método de envío disponible
   * @throws Error si el elemento no se puede seleccionar
   */
  async selectShippingMethod(): Promise<void> {
    await this.shippingMethodRadio.waitFor({ timeout: this.DEFAULT_TIMEOUT });
    await this.shippingMethodRadio.check();
    await this.shippingContinueButton.click();
    await this.paymentMethodRadio.waitFor({ timeout: this.DEFAULT_TIMEOUT });
  }

  /**
   * Selecciona el método de pago y acepta términos
   * @throws Error si no se pueden aceptar los términos
   */
  async selectPaymentMethod(): Promise<void> {
    await this.paymentMethodRadio.waitFor({ timeout: this.DEFAULT_TIMEOUT });
    await this.paymentMethodRadio.check();
    await this.termsCheckbox.check();
    await this.paymentContinueButton.click();
    await this.confirmOrderButton.waitFor({ timeout: this.DEFAULT_TIMEOUT });
  }

  /**
   * Confirma el pedido y completa el checkout
   * @returns {Promise<void>}
   * @throws Error si el pedido no se puede confirmar
   */
  async confirmOrder(): Promise<void> {
    await this.confirmOrderButton.click();
    // Wait for success page
    await this.page.waitForURL('**/checkout/success', { timeout: this.DEFAULT_TIMEOUT });
    await this.successMessage.waitFor({ timeout: this.DEFAULT_TIMEOUT });
  }

  /**
   * Obtiene el título de la página
   * @returns {Promise<string>} Título de la página actual
   */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }
}