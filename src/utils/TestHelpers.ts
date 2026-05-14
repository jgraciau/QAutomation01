import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Utilidades y helpers para pruebas de Playwright
 * Proporciona funciones comunes para interacciones con elementos
 */

// Definir tipos para los datos de prueba
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
}

export interface Address {
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  country: string;
  zone: string;
}

export interface Product {
  name: string;
  category: string;
  price: number;
}

export interface TestData {
  users: {
    guest: User;
    registered: {
      email: string;
      password: string;
    };
  };
  addresses: {
    default: Address;
  };
  products: Product[];
}
export class TestHelpers {
  /**
   * Carga datos de prueba desde el archivo JSON
   * @returns {TestData} Los datos de prueba parseados
   */
  static loadTestData(): TestData {
    const filePath = path.join(__dirname, '../../config/test-data.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }
  /**
   * Selecciona una opción de un select por etiqueta.
   * Si la etiqueta no existe, selecciona la primera opción válida.
   *
   * @param {Locator} selectLocator - Localizador del elemento select
   * @param {string} label - Etiqueta de la opción a seleccionar
   * @throws Error si no se puede seleccionar la opción
   *
   * @example
   * await TestHelpers.selectOptionByLabelOrFirst(page.locator('#country'), 'United Kingdom');
   */
  static async selectOptionByLabelOrFirst(selectLocator: Locator, label: string): Promise<void> {
    try {
      // Intenta seleccionar por etiqueta exacta
      const option = selectLocator.locator(`option:has-text("${label}")`);
      if ((await option.count()) > 0) {
        await selectLocator.selectOption({ label });
        return;
      }

      // Si no encuentra la etiqueta, selecciona la primera opción válida
      const firstValidValue = await selectLocator
        .locator('option:not(:has-text("--- Please Select ---"))')
        .first()
        .getAttribute('value');

      if (firstValidValue) {
        await selectLocator.selectOption(firstValidValue);
      }
    } catch (error) {
      throw new Error(`Failed to select option "${label}" from select element: ${error}`);
    }
  }

  /**
   * Espera a que la página cargue completamente
   * @param {Page} page - Instancia de la página
   * @throws Error si la página no se carga
   */
  static async waitForPageLoad(page: Page): Promise<void> {
    await page.waitForLoadState('load');
  }

  /**
   * Completa un campo de formulario de forma segura
   * @param {Locator} locator - Localizador del campo
   * @param {string} value - Valor a escribir
   * @throws Error si el campo no se puede completar
   */
  static async fillFormField(locator: Locator, value: string): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.fill(value);
  }

  /**
   * Hace clic en un elemento de forma segura
   * @param {Locator} locator - Localizador del elemento
   * @throws Error si el elemento no se puede hacer clic
   */
  static async clickElement(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();
    await locator.click();
  }

  /**
   * Espera a que un elemento esté visible en la página
   * @param {Locator} locator - Localizador del elemento
   * @throws Error si el elemento no es visible
   */
  static async waitForElement(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  /**
   * Genera datos de prueba aleatorios para pruebas
   * @returns {Object} Objeto con datos aleatorios
   */
  static generateRandomTestData() {
    const timestamp = Date.now();
    return {
      email: `test.${timestamp}@example.com`,
      firstName: `First_${timestamp}`,
      lastName: `Last_${timestamp}`,
      telephone: `555${Math.floor(Math.random() * 1000000)}`,
    };
  }
}