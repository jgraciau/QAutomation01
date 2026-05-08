# Plan de Pruebas E2E para Playwright.dev

## Descripción de la aplicación

Plan de pruebas end-to-end completo para el sitio de documentación de Playwright, enfocado en las interacciones de usuario, la navegación, la funcionalidad de búsqueda y las características de accesibilidad.

## Escenarios de prueba

### 1. Funcionalidad de la página principal

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verificar que la página principal se cargue correctamente

**Archivo:** `tests/homepage.spec.ts`

**Pasos:**
  1. Navegar a https://playwright.dev/
    - expectativa: el título de la página debe ser `Fast and reliable end-to-end testing for modern web apps | Playwright`
  2. Comprobar la presencia del encabezado principal
    - expectativa: el encabezado principal `Playwright enables reliable web automation for testing, scripting, and AI agents.` debe ser visible
  3. Verificar que el enlace `Get started` esté presente
    - expectativa: el botón `Get started` debe ser visible y clicable

#### 1.2. Navegar a la documentación desde la página principal

**Archivo:** `tests/homepage.spec.ts`

**Pasos:**
  1. Navegar a https://playwright.dev/
    - expectativa: el título de la página debe ser `Fast and reliable end-to-end testing for modern web apps | Playwright`
  2. Hacer clic en el enlace `Get started`
    - expectativa: la URL debe cambiar a https://playwright.dev/docs/intro
    - expectativa: el título de la página debe ser `Installation | Playwright`

#### 1.3. Probar el selector de tema

**Archivo:** `tests/homepage.spec.ts`

**Pasos:**
  1. Navegar a https://playwright.dev/
    - expectativa: el título de la página debe ser `Fast and reliable end-to-end testing for modern web apps | Playwright`
  2. Localizar el botón para cambiar el tema
    - expectativa: el botón del selector de tema debe estar presente
  3. Hacer clic en el botón para cambiar el tema
    - expectativa: la página debe cambiar de tema sin errores

#### 1.4. Probar enlaces externos

**Archivo:** `tests/homepage.spec.ts`

**Pasos:**
  1. Navegar a https://playwright.dev/
    - expectativa: el título de la página debe ser `Fast and reliable end-to-end testing for modern web apps | Playwright`
  2. Hacer clic en el enlace del repositorio de GitHub
    - expectativa: el enlace de GitHub debe abrirse en una nueva pestaña o navegar correctamente
  3. Hacer clic en el enlace del servidor de Discord
    - expectativa: el enlace de Discord debe abrirse en una nueva pestaña o navegar correctamente

### 2. Navegación y barra lateral

**Seed:** `tests/seed.spec.ts`

#### 2.1. Probar los enlaces de navegación principal

**Archivo:** `tests/navigation.spec.ts`

**Pasos:**
  1. Navegar a https://playwright.dev/
    - expectativa: el título de la página debe ser `Fast and reliable end-to-end testing for modern web apps | Playwright`
  2. Hacer clic en `Docs` en la navegación principal
    - expectativa: la página de Docs debe cargarse con el título `Installation | Playwright`
  3. Hacer clic en `MCP` en la navegación principal
    - expectativa: la página de MCP debe cargarse
  4. Hacer clic en `CLI` en la navegación principal
    - expectativa: la página de CLI debe cargarse
  5. Hacer clic en `API` en la navegación principal
    - expectativa: la página de API debe cargarse

#### 2.2. Probar la navegación de la barra lateral en docs

**Archivo:** `tests/navigation.spec.ts`

**Pasos:**
  1. Navegar a https://playwright.dev/docs/intro
    - expectativa: la página de docs debe cargarse
  2. Comprobar la presencia de la barra lateral
    - expectativa: la barra lateral debe ser visible
  3. Hacer clic en `Writing tests` en la barra lateral
    - expectativa: la página `Writing tests` debe cargarse
  4. Hacer clic en `Running and debugging tests` en la barra lateral
    - expectativa: la página `Running and debugging tests` debe cargarse

### 3. Funcionalidad de búsqueda

**Seed:** `tests/seed.spec.ts`

#### 3.1. Abrir y usar la búsqueda

**Archivo:** `tests/search.spec.ts`

**Pasos:**
  1. Navegar a https://playwright.dev/
    - expectativa: el título de la página debe ser `Fast and reliable end-to-end testing for modern web apps | Playwright`
  2. Hacer clic en el botón de búsqueda (Ctrl+K)
    - expectativa: el modal de búsqueda debe abrirse
  3. Verificar que el campo de búsqueda está activo
    - expectativa: el input de búsqueda debe tener el foco

#### 3.2. Realizar una consulta de búsqueda

**Archivo:** `tests/search.spec.ts`

**Pasos:**
  1. Abrir el modal de búsqueda
    - expectativa: el modal de búsqueda debe estar abierto
  2. Escribir `test` en el cuadro de búsqueda
    - expectativa: deben aparecer resultados de búsqueda para `test`
  3. Verificar que los resultados de búsqueda contienen enlaces esperados
    - expectativa: los resultados deben incluir páginas relevantes como `Writing tests`

#### 3.3. Navegar desde los resultados de búsqueda

**Archivo:** `tests/search.spec.ts`

**Pasos:**
  1. Realizar la búsqueda de `test`
    - expectativa: deben mostrarse resultados de búsqueda para `test`
  2. Hacer clic en un enlace de resultado
    - expectativa: la página seleccionada debe cargarse

#### 3.4. Consulta de búsqueda vacía

**Archivo:** `tests/search.spec.ts`

**Pasos:**
  1. Abrir el modal de búsqueda
    - expectativa: el modal de búsqueda debe estar abierto
  2. Escribir cadena vacía o limpiar la búsqueda
    - expectativa: no debe mostrarse ningún resultado o deben aparecer búsquedas recientes
  3. Presionar Escape para cerrar la búsqueda
    - expectativa: el modal debe cerrarse sin errores

### 4. Casos límite y manejo de errores

**Seed:** `tests/seed.spec.ts`

#### 4.1. Probar la capacidad de respuesta de la página

**Archivo:** `tests/edge-cases.spec.ts`

**Pasos:**
  1. Navegar a https://playwright.dev/
    - expectativa: la página debe cargarse correctamente
  2. Cambiar el tamaño de la ventana del navegador a tamaño móvil
    - expectativa: el diseño debe adaptarse a diferentes tamaños de viewport
  3. Probar los elementos de navegación en pantalla pequeña
    - expectativa: la navegación debe funcionar en móvil

#### 4.2. Probar URL inválidas

**Archivo:** `tests/edge-cases.spec.ts`

**Pasos:**
  1. Navegar a https://playwright.dev/invalid-page
    - expectativa: debe mostrarse una página 404 o debe manejarse el error
  2. Comprobar las opciones de navegación en la página de error
    - expectativa: el usuario debe poder volver a navegar

#### 4.3. Probar fallos de red

**Archivo:** `tests/edge-cases.spec.ts`

**Pasos:**
  1. Simular desconexión de red
    - expectativa: la página debe manejar el estado sin conexión de forma adecuada
  2. Intentar cargar la página o realizar acciones sin red
    - expectativa: deben aparecer mensajes de error apropiados
