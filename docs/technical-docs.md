# Documentación Técnica - QAutomation01

## Arquitectura del Proyecto

Este proyecto utiliza Playwright para automatización de pruebas E2E en el sitio de OpenCart.

### Estructura de Carpetas

```
QAutomation01/
├── src/
│   ├── pages/          # Page Objects
│   ├── utils/          # Utilidades y helpers
│   └── test-data/      # Datos de prueba
├── tests/              # Archivos de prueba
├── docs/               # Documentación
├── test-results/       # Resultados de pruebas
├── playwright.config.ts # Configuración de Playwright
├── package.json        # Dependencias y scripts
└── README.md           # Documentación principal
```

## Page Object Model

Utilizamos el patrón Page Object Model para mantener la separación de responsabilidades:

- **CheckoutPage.ts**: Maneja todas las interacciones con la página de checkout
- **TestHelpers.ts**: Utilidades comunes para las pruebas
- **checkoutData.ts**: Datos de prueba centralizados

## Configuración

- **Base URL**: http://opencart.abstracta.us/index.php?route=
- **Proyectos**: chromium, firefox, webkit
- **Ejecución**: Paralela con retención de fallos

## Scripts Disponibles

- `npm run test`: Ejecutar todas las pruebas
- `npm run test:headed`: Ejecutar pruebas en modo headed
- `npm run test:debug`: Ejecutar pruebas en modo debug

## Mejores Prácticas

1. Usar Page Objects para encapsular lógica de UI
2. Centralizar datos de prueba
3. Mantener selectores robustos
4. Usar waits apropiados
5. Documentar casos de prueba