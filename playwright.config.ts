import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  testIgnore: '**/deprecated/**',

  /* Timeouts globales */
  timeout: 120 * 1000,
  globalTimeout: 30 * 60 * 1000,

  expect: {
    timeout: 20 * 1000,
  },

  /* Ejecución */
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,

  /* Artefactos de ejecución */
  outputDir: 'test-results',

  /* Reportes */
  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'reports/results.json' }],
    ['junit', { outputFile: 'reports/junit.xml' }],
    ['list'],
  ],

  /* Configuración compartida para todos los navegadores */
  use: {
    baseURL:
      process.env.BASE_URL || 'http://opencart.abstracta.us/index.php?route=',
    headless: isCI,
    actionTimeout: 30 * 1000,
    navigationTimeout: 50 * 1000,
    trace: isCI ? 'retain-on-failure' : 'on',
    video: isCI ? 'retain-on-failure' : 'on',
    screenshot: isCI ? 'only-on-failure' : 'on',
    ignoreHTTPSErrors: true,
  },

  /* Navegadores */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
