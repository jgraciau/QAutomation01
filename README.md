# QAutomation01 - Framework de Automatización E2E

> **Framework moderno de pruebas E2E con Playwright para OpenCart**  
> Arquitectura empresarial • Código limpio • Mantenible y escalable

---

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Características Principales](#características-principales)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración](#configuración)
- [Ejecución de Pruebas](#ejecución-de-pruebas)
- [Arquitectura y Patrones](#arquitectura-y-patrones)
- [Mejores Prácticas](#mejores-prácticas)
- [Troubleshooting](#troubleshooting)
- [Contribuir](#contribuir)

---

## Descripción General

**QAutomation01** es un framework de automatización de pruebas End-to-End (E2E) diseñado con estándares empresariales. Utiliza **Playwright** como motor de automatización y **TypeScript** para garantizar tipado fuerte y código mantenible.

Este proyecto implementa el patrón **Page Object Model (POM)** que proporciona:
- ✅ Separación clara entre lógica de prueba e implementación de UI
- ✅ Reutilización de código
- ✅ Mantenimiento simplificado
- ✅ Escalabilidad a nivel empresarial

### Aplicación Bajo Prueba

- **Nombre:** OpenCart Demo Store
- **URL:** [http://opencart.abstracta.us](http://opencart.abstracta.us)
- **Funcionalidad Principal:** Checkout como invitado (Guest Checkout)

---

## Características Principales

### 🎯 Funcionalidades

- **Page Object Model:** Encapsulación completa de elementos y acciones
- **TypeScript:** Tipado fuerte con soporte a interfaces personalizadas
- **Múltiples Navegadores:** Chromium, Firefox, WebKit
- **Reportes Avanzados:** HTML, JSON, JUnit
- **Captura de Evidencia:** Screenshots y videos en fallos
- **Trazas:** Traces detallados para debugging
- **Datos Parametrizados:** Configuración centralizada
- **CI/CD Ready:** Integración lista para pipelines

### 🚀 Rendimiento

- Ejecución paralela de pruebas
- Timeouts configurables
- Reintentos automáticos en CI
- Workers optimizados

---

## Requisitos Previos

| Requisito | Versión Mínima |
|-----------|---|
| Node.js | 18.x |
| npm | 8.x |
| Git | 2.0+ |

```bash
node --version     # v18.x.x
npm --version      # 8.x.x
```

---

## Instalación

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd QAutomation01
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Instalar Navegadores Playwright

```bash
npx playwright install
```

### 4. Verificar Instalación

```bash
npm run test -- --version
```

---

## Estructura del Proyecto

```
QAutomation01/
│
├── src/                             # Código fuente
│   ├── pages/                       # Page Objects
│   │   └── CheckoutPage.ts          # Lógica de checkout
│   ├── utils/                       # Utilidades
│   │   └── TestHelpers.ts           # Funciones auxiliares
│   └── test-data/                   # Datos de prueba
│       └── checkoutData.ts          # Datos centralizados
│
├── tests/                           # Casos de prueba
│   └── opencart/
│       └── guest-checkout.spec.ts   # Suite E2E principal
│
├── config/                          # Configuración
│   ├── environments.json            # Por entorno
│   └── test-data.json               # Datos en JSON
│
├── docs/                            # Documentación
│   ├── README.md                    # Docs principales
│   └── technical-docs.md            # Detalles técnicos
│
├── scripts/                         # Scripts personalizados
│   └── run-tests.sh                 # Ejecución
│
├── test-results/                    # Reportes y evidencia
│   ├── html/                        # Reporte HTML
│   ├── results.json                 # Resultados JSON
│   └── junit.xml                    # Reporte JUnit
│
├── playwright.config.ts             # Configuración Playwright
├── package.json                     # Scripts y dependencias
├── .env.example                     # Variables de entorno
└── README.md                        # Este archivo
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
- `selectOptionByLabelOrFirst()`: Selecciona opciones en dropdowns
- `waitForElement()`: Esperas seguras
- `generateRandomTestData()`: Datos aleatorios

#### `tests/` - Casos de Prueba

Suite de pruebas organizadas por funcionalidad. Convención: `*.spec.ts`

#### `config/` - Configuración

- `environments.json`: URLs, timeouts, retries por entorno
- `test-data.json`: Datos centralizados

---

## Configuración

### Archivo: `playwright.config.ts`

```typescript
export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,              // 30 segundos por test
  expect: { timeout: 5000 },       // 5 segundos para aserciones
  fullyParallel: true,             // Ejecución paralela
  retries: process.env.CI ? 2 : 0, // Reintentos en CI
  workers: process.env.CI ? 1 : undefined,
});
```

### Archivo: `.env.example`

```bash
BASE_URL=http://opencart.abstracta.us/index.php?route=
ENVIRONMENT=staging
HEADED=false
DEBUG=false
```

### Archivo: `config/environments.json`

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

### Scripts Disponibles

#### Ejecutar Todas las Pruebas

```bash
npm run test
```

Ejecuta en paralelo, genera reporte HTML y muestra resultados.

#### Modo Visual (Headed)

```bash
npm run test:headed
```

Abre navegador visible para debugging.

#### Debug Interactivo

```bash
npm run test:debug
```

Abre Playwright Inspector para control paso a paso.

#### Interfaz Web

```bash
npm run test:ui
```

Interface web interactiva para seleccionar y ejecutar tests.

#### Para CI/CD

```bash
npm run test:ci
```

Usa reporter minimalist, 1 worker, reintentos automáticos.

#### Ver Reportes

```bash
npm run report
```

Abre reporte HTML con videos y screenshots.

### Ejecutar Pruebas Específicas

```bash
# Una suite específica
npx playwright test tests/opencart/guest-checkout.spec.ts

# Un test específico
npx playwright test -g "Completa el flujo"

# Navegador específico
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Combinados
npx playwright test tests/opencart/ --project=chromium --headed
```

### Usando Scripts Personalizados

```bash
./scripts/run-tests.sh chromium headed
./scripts/run-tests.sh firefox debug
```

---

## Arquitectura y Patrones

### Page Object Model (POM)

Patrón de diseño que encapsula lógica de UI en clases reutilizables.

**Ventajas:**
- ✅ Separación de responsabilidades
- ✅ Mantenimiento centralizado
- ✅ Reutilización de código
- ✅ Tests legibles

**Ejemplo:**

```typescript
// Page Object
export class CheckoutPage {
  constructor(page: Page) {
    this.firstNameInput = page.locator('#input-payment-firstname');
  }

  async fillBillingDetails(details: BillingDetails): Promise<void> {
    await this.firstNameInput.fill(details.firstName);
    // Más acciones...
  }
}

// Test (limpio y legible)
test('Complete checkout', async ({ page }) => {
  const checkout = new CheckoutPage(page);
  await checkout.fillBillingDetails(testData);
  await checkout.confirmOrder();
});
```

### Estrategias de Espera

**❌ EVITAR:**
```typescript
await page.waitForTimeout(1000);  // Deprecated
```

**✅ USAR:**
```typescript
await element.waitFor({ state: 'visible' });
await page.waitForURL('**/checkout/success');
await page.waitForFunction(() => /* condición */);
```

### Datos Parametrizados

```typescript
import * as config from '../config/test-data.json';

test('Checkout', async ({ page }) => {
  const checkout = new CheckoutPage(page);
  await checkout.fillBillingDetails(config.addresses.default);
});
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

---

## Contacto y Soporte

Para preguntas o soporte:
- 📧 Crear un issue en el repositorio
- 📚 [Documentación Playwright](https://playwright.dev)
- 🔗 [Page Object Model Best Practices](https://docs.microsoft.com/en-us/archive/msdn-magazine/2012/december/msdn-magazine-automation-patterns-page-object-pattern)

---

**Última actualización:** 2026-05-08  
**Versión:** 1.0.0  
**Estado:** ✅ Producción

## Estructura de Ingeniería Recomendada

Para un proyecto de automatización empresarial, recomendamos la siguiente arquitectura:

### 1. **tests/** - Casos de Prueba
   - Organizados por dominio/funcionalidad (ej: `opencart/`, `user-management/`)
   - Nombres descriptivos: `guest-checkout.spec.ts`, `login-validation.spec.ts`
   - Evitar lógica compleja; usar Page Objects para interacciones.

### 2. **src/pages/** - Page Objects
   - Clases que encapsulan la lógica de cada página.
   - Ejemplo: `CheckoutPage.ts`, `HomePage.ts`
   - Métodos como `fillBillingDetails()`, `selectPaymentMethod()`

### 3. **src/utils/** - Utilidades
   - Helpers para selecciones dinámicas, esperas personalizadas.
   - Generadores de datos de prueba, validadores.
   - Ejemplo: `test-helpers.ts`, `data-generators.ts`

### 4. **src/fixtures/** - Fixtures Personalizadas
   - Configuraciones de prueba reutilizables.
   - Setup/teardown común entre tests.

### 5. **docs/** - Documentación
   - Planes de prueba, guías de ejecución.
   - Documentación técnica y arquitectura.

### 6. **scripts/** - Automatización
   - Scripts de CI/CD, configuración.
   - Utilidades para ejecución local.

### 7. **test-results/** - Resultados
   - Reportes HTML, screenshots de fallos.
   - Archivos de log y traces.

## Principios de Ingeniería

### Arquitectura
- **Page Object Model**: Separación clara entre lógica de prueba y UI.
- **Single Responsibility**: Cada clase/módulo tiene una responsabilidad única.
- **DRY (Don't Repeat Yourself)**: Reutilización de código mediante helpers y fixtures.

### Calidad de Código
- **TypeScript**: Tipado fuerte para mayor robustez.
- **Linting**: ESLint para consistencia de código.
- **Pre-commit hooks**: Validaciones automáticas antes de commits.

### Ejecución y Mantenimiento
- **Configuración centralizada**: `playwright.config.ts` para entornos.
- **Datos parametrizados**: Archivos JSON para datos de prueba.
- **Reportes detallados**: HTML reports con screenshots y traces.

### Escalabilidad
- **Paralelización**: Ejecución concurrente para velocidad.
- **CI/CD**: Integración continua con pipelines automatizados.
- **Versionado**: Control de versiones para estabilidad.

## Ejecución de Pruebas

### Requisitos Previos
- Node.js 18+
- npm o yarn

### Instalación
```bash
npm install
```

### Ejecutar Pruebas
```bash
# Todas las pruebas
npm run test

# Pruebas en modo visual
npm run test:headed

# Pruebas en modo debug
npm run test:debug

# Pruebas específicas
npx playwright test tests/opencart/guest-checkout.spec.ts

# Con reporte HTML
npx playwright show-report
```

### Usando Scripts
```bash
# Ejecutar con script personalizado
./scripts/run-tests.sh chromium headed
```

## Mejores Prácticas

1. **Selectores Robustos**: Usar data-testid, roles ARIA, o selectores únicos.
2. **Waits Apropiados**: Evitar `waitForTimeout`; usar `waitFor` con condiciones.
3. **Datos de Prueba**: Centralizar y parametrizar datos sensibles.
4. **Manejo de Errores**: Capturar screenshots en fallos para debugging.
5. **Nombres Descriptivos**: Tests y métodos autoexplicativos.
6. **Documentación**: Mantener README y docs actualizados.
   - Extensiones de Playwright fixtures para setup común.
   - Ejemplo: `authenticated-user.ts`, `cart-with-items.ts`

### 5. **config/** - Configuraciones
   - `environments.json`: URLs, credenciales por entorno (dev, staging, prod)
   - `test-data.json`: Datos estáticos para pruebas
   - Variables de entorno con `.env` files

### 6. **docs/** - Documentación
   - Planes de prueba, guías de contribución.
   - Arquitectura del framework, convenciones de código.

### 7. **scripts/** - Automatización de CI/CD
   - Scripts para ejecutar pruebas en diferentes entornos.
   - Generación de reportes, limpieza de datos.

## Principios de Diseño

- **Page Object Model**: Separar lógica de prueba de implementación de UI.
- **Data-Driven Testing**: Usar fixtures y datos externos para variabilidad.
- **Parallel Execution**: Configurar para ejecución paralela en CI.
- **Reporting**: HTML reports con screenshots/videos en fallos.
- **Version Control**: Commits claros, branches por feature.

## Cómo ejecutar

- `npm install`
- `npm test` - Ejecuta todas las pruebas
- `npm run test:ci` - Para CI (sin UI)
- `npm run test:headed` - Con navegador visible
- `npm run report` - Ver reportes

## Notas de organización

- Los archivos de prueba temporales y de depuración se migraron a documentación o se marcaron como obsoletos.
- La carpeta `tests/opencart/` es el punto de entrada actual para los casos E2E.
- Archivos de snapshot y resultados generados están identificados como artefactos temporales y no forman parte del flujo principal.

