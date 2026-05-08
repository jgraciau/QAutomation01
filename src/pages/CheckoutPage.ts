import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  // Selectors
  readonly guestCheckoutRadio: Locator;
  readonly continueButton: Locator;
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
  readonly shippingMethodRadio: Locator;
  readonly shippingContinueButton: Locator;
  readonly paymentMethodRadio: Locator;
  readonly termsCheckbox: Locator;
  readonly paymentContinueButton: Locator;
  readonly confirmOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.guestCheckoutRadio = page.locator('input[name="account"][value="guest"]');
    this.continueButton = page.locator('#button-account');
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
    this.shippingMethodRadio = page.locator('#collapse-shipping-method input[type="radio"]').first();
    this.shippingContinueButton = page.locator('#button-shipping-method');
    this.paymentMethodRadio = page.locator('#collapse-payment-method input[type="radio"]').first();
    this.termsCheckbox = page.locator('#collapse-payment-method input[name="agree"]');
    this.paymentContinueButton = page.locator('#button-payment-method');
    this.confirmOrderButton = page.locator('#button-confirm');
  }

  async selectGuestCheckout() {
    await this.guestCheckoutRadio.check();
    await this.continueButton.click();
  }

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
  }) {
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.emailInput.fill(details.email);
    await this.telephoneInput.fill(details.telephone);
    await this.address1Input.fill(details.address1);
    await this.address2Input.fill(details.address2);
    await this.cityInput.fill(details.city);
    await this.postcodeInput.fill(details.postcode);
    await this.countrySelect.selectOption({ label: details.country });
    await this.zoneSelect.selectOption({ label: details.zone });
    await this.sameAddressCheckbox.check();
    await this.guestContinueButton.click();
  }

  async selectShippingMethod() {
    await this.shippingMethodRadio.check();
    await this.shippingContinueButton.click();
  }

  async selectPaymentMethod() {
    await this.paymentMethodRadio.check();
    await this.termsCheckbox.check();
    await this.paymentContinueButton.click();
  }

  async confirmOrder() {
    await this.confirmOrderButton.click();
  }
}