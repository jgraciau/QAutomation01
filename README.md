# QAutomation01 - Framework de Automatización E2E

> Framework de pruebas E2E con Playwright para OpenCart.
> 
> Arquitectura limpia, Page Object Model y configuraciones listas para CI.

---

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración](#configuración)
- [Ejecución de Pruebas](#ejecución-de-pruebas)
- [Arquitectura](#arquitectura)
- [Troubleshooting](#troubleshooting)
- [Contribuir](#contribuir)

---

## Descripción

**QAutomation01** es un framework E2E construido con **Playwright** y **TypeScript** para automatizar el flujo de checkout en **OpenCart Demo Store**.

Esta solución está diseñada para:
- Separar lógica de UI y tests con **Page Object Model (POM)**.
- Facilitar mantenimiento y escalabilidad.
- Generar evidencia con **screenshots**, **videos** y **trazas**.
- Ejecutarse en **CI/CD** con reintentos automáticos.

### Aplicación bajo prueba

- **URL:** http://opencart.abstracta.us
- **Funcionalidad principal:** Guest Checkout

---

## Requisitos

- Node.js 18.x
- npm 8.x
- Git 2.0+

```bash
node --version
npm --version
```

---

## Instalación

```bash
git clone <url-del-repositorio>
cd QAutomation01
npm install
npx playwright install
```

---

## Estructura del Proyecto

```text
QAutomation01/
├── config/                      # Configuraciones y datos
│   ├── environments.json
│   └── test-data.json
├── docs/                        # Documentación adicional
│   ├── README.md
│   └── technical-docs.md
├── src/                         # Lógica del framework
│   ├── pages/                   # Page Objects
│   │   └── CheckoutPage.ts
│   ├── test-data/               # Datos de prueba TS
│   └── utils/                   # Utilidades compartidas
├── tests/                       # Suites de prueba Playwright
│   └── opencart/
│       └── guest-checkout.spec.ts
├── playwright.config.ts         # Configuración de Playwright
├── package.json                 # Scripts y dependencias
├── .env.example                 # Variables de entorno
└── README.md                    # Documentación principal
```

### Descripción de Carpetas Clave

#### `src/pages/` - Page Objects

Encapsulan la interacción con elementos UI de cada página.

```typescript
export class CheckoutPage {
  readonly firstNameInput: Locator;

  async fillBillingDetails(details: BillingDetails): Promise<void> {
    // Lógica centralizada
  }
}
```

#### `src/utils/` - Utilidades

Funciones auxiliares reutilizables:
- `waitForElement()`: Esperas seguras
- `formatCurrency()`: Formateo de valores
- `generateRandomTestData()`: Datos de prueba

#### `tests/` - Casos de Prueba

Suite de pruebas organizada por dominio.

#### `config/` - Configuración

- `environments.json`: URLs y timeouts por entorno
- `test-data.json`: Datos de prueba centralizados

---

## Configuración

### `playwright.config.ts`

- `testDir`: `./tests`
- `outputDir`: `test-results`
- `reporter`: `list`
- `trace`: habilitado en retry mode
- `video`: `retain-on-failure`
- `screenshot`: `only-on-failure`
- `ignoreHTTPSErrors`: true

### `.env.example`

```bash
BASE_URL=http://opencart.abstracta.us/index.php?route=
ENVIRONMENT=staging
HEADED=false
DEBUG=false
```

### `config/environments.json`

```json
{
  "environments": {
    "staging": {
      "baseUrl": "http://opencart.abstracta.us/index.php?route=",
      "timeout": 30000
    },
    "production": {
      "baseUrl": "https://opencart.abstracta.us/index.php?route=",
      "timeout": 60000
    }
  }
}
```

---

## Ejecución de Pruebas

### Scripts disponibles

```bash
npm run test
npm run test:ci
npm run test:headed
npm run test:debug
npm run test:ui
npm run report
```

### Ejecutar todas las pruebas

```bash
npm run test
```

### Modo CI

```bash
npm run test:ci
```

### Headed

```bash
npm run test:headed
```

### Debug

```bash
npm run test:debug
```

### Ver reportes

```bash
npm run report
```

### Ejecutar pruebas específicas

```bash
npx playwright test tests/opencart/guest-checkout.spec.ts
npx playwright test -g "Completa el flujo"
npx playwright test --project=chromium
```

---

## Arquitectura

### Page Object Model (POM)

Este proyecto usa Page Objects para encapsular la lógica de UI y mantener los tests limpios.

```typescript
export class CheckoutPage {
  constructor(page: Page) {
    this.firstNameInput = page.locator('#input-payment-firstname');
  }

  async fillBillingDetails(details: BillingDetails): Promise<void> {
    await this.firstNameInput.fill(details.firstName);
  }
}
```

### Estrategias de espera

**Evitar:**

```typescript
await page.waitForTimeout(1000);
```

**Usar:**

```typescript
await element.waitFor({ state: 'visible' });
await page.waitForURL('**/checkout/success');
```

---

## Mejores Prácticas

### 1. Selectores Robustos

**Orden de Preferencia:**

```typescript
// 1️⃣ Mejor
page.locator('[data-testid=\"btn-checkout\"]')

// 2️⃣ Bueno
page.getByRole('button', { name: 'Checkout' })

// 3️⃣ Aceptable
page.locator('#button-checkout')

// 4️⃣ Evitar (frágil)
page.locator('div > form > button')
```

### 2. Nomenclatura Consistente

```typescript
// ✅ Descriptivo
test('Guest checkout completes order successfully', async () => {})

// ❌ Vago
test('Checkout works', async () => {})
```

### 3. Documentación JSDoc

```typescript
/**
 * Completa los detalles de facturación
 * @param {BillingDetails} details - Datos del cliente
 * @throws {Error} Si algún campo no se completa
 * @example
 * await checkout.fillBillingDetails(userDetails);
 */
async fillBillingDetails(details: BillingDetails): Promise<void> {
  // Implementación
}
```

### 4. Tests Independientes

Cada test debe ser ejecutable sin depender de otros:
- Usar `beforeEach` para setup común
- Usar `afterEach` para cleanup
- No compartir estado entre tests

### 5. Anti-Patterns a Evitar

```typescript
// ❌ NO HACER
await page.waitForTimeout(5000);
await page.waitForNavigation();  // Deprecated
await new Promise(r => setTimeout(r, 1000));

// ✅ HACER
await page.waitForLoadState('load');
await page.waitForURL('**/path');
await element.waitFor();
```

---

## Troubleshooting

### Problema: \"Element not found\"

```typescript
// Solución 1: Esperar a elemento
await page.locator('selector').waitFor({ state: 'visible' });

// Solución 2: Usar data-testid
await page.locator('[data-testid=\"my-element\"]').click();

// Solución 3: Debug mode
npx playwright test --debug
```

### Problema: Timeout en dropdown

```typescript
// Dropdown no se llena tras seleccionar país
await page.waitForFunction(() => {
  const options = document.querySelectorAll('#select option');
  return Array.from(options).length > 1;
}, { timeout: 10000 });
```

### Problema: Tests fallan en CI pero pasan localmente

```bash
# Usar mismas variables
BASE_URL=http://opencart.abstracta.us npm run test

# Mismo número de workers
npm run test -- --workers=1

# Ver qué sucede
npm run test:headed
```

### Generar Reporte de Debugging

```bash
# Capturar trace
npx playwright test --trace on

# Ver trace
npx playwright show-trace trace.zip
```

---

## Contribuir

### Workflow de Contribución

1. **Crear rama feature:**
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

2. **Seguir estructura:**
   - Usar Page Objects para nuevas páginas
   - Documentar con JSDoc
   - Nombres descriptivos

3. **Tests antes de PR:**
   ```bash
   npm run test
   npm run test:ui  # Verificar visualmente
   ```

4. **Commits descriptivos:**
   ```bash
   git commit -m \"feat: añadir test para login\"
   ```

### Checklist Antes de PR

- [ ] Tests pasan: `npm run test`
- [ ] Código sigue convenciones
- [ ] Documentación JSDoc completa
- [ ] Sin código comentado
- [ ] README actualizado si es necesario


