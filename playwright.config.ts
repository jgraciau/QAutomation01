import { defineConfig, devices } from '@playwright/test';

/**
 * Configuración de Playwright para pruebas E2E del framework OpenCart
 * Documentación: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  testIgnore: '**/deprecated/**',
  timeout: 30 * 1000,
  globalTimeout: 30 * 60 * 1000, // 30 minutos
  expect: {
    timeout: 5000,
  },

  /* Ejecución */
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  /* Reportes */
  reporter: [
    ['html', { open: 'never', outputFolder: 'test-results/html' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list'],
  ],

  /* Configuración compartida para todos los navegadores */
  use: {
    baseURL: process.env.BASE_URL || 'http://opencart.abstracta.us/index.php?route=',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: 10000,
  },

  /* Navegadores */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* Servidor local (descomenta si es necesario) */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120 * 1000,
  // },
});
