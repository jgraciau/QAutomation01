import { Page, Locator } from '@playwright/test';

export class TestHelpers {
  static async selectOptionByLabelOrFirst(selectLocator: Locator, label: string): Promise<void> {
    try {
      await selectLocator.selectOption({ label });
    } catch (error) {
      // If label doesn't exist, select the first option
      const options = selectLocator.locator('option');
      const firstOption = options.first();
      await firstOption.waitFor();
      await selectLocator.selectOption({ index: 1 }); // Index 0 is usually placeholder
    }
  }

  static async waitForPageLoad(page: Page): Promise<void> {
    await page.waitForLoadState('networkidle');
  }

  static async fillFormField(locator: Locator, value: string): Promise<void> {
    await locator.waitFor();
    await locator.fill(value);
  }

  static async clickElement(locator: Locator): Promise<void> {
    await locator.waitFor();
    await locator.click();
  }
}