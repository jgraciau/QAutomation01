# OpenCart Automation Framework

Este proyecto contiene pruebas E2E automatizadas para el sitio OpenCart de prueba.
La estructura está organizada para un proyecto empresarial robusto y escalable.

## Estructura del proyecto

```
├── tests/
│   └── opencart/
│       └── guest-checkout.spec.ts    # Caso de prueba principal
├── docs/
│   ├── README.md                     # Guía de documentación
│   └── test-plan-opencart.md         # Plan de pruebas detallado
├── src/
│   ├── pages/                        # Page Objects (recomendado)
│   ├── utils/                        # Utilidades y helpers
│   └── fixtures/                     # Fixtures personalizadas
├── config/
│   ├── environments.json             # Configuración de entornos
│   └── test-data.json                # Datos de prueba
├── scripts/
│   ├── ci.sh                         # Scripts de CI/CD
│   └── setup.sh                      # Scripts de configuración
├── playwright.config.ts              # Configuración global de Playwright
├── package.json                      # Scripts y dependencias
├── README.md                         # Este archivo
└── .gitignore                        # Archivos ignorados
```

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

