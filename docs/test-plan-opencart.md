# OpenCart Guest Checkout Plan

## Application Overview

Plan de pruebas E2E de OpenCart para validar el flujo de compra y checkout de invitado, incluyendo selección de producto, carrito y proceso de pago.

## Test Scenarios

### 1. OpenCart Guest Checkout Suite

**Seed:** `tests/seed.spec.ts`

#### 1.1. Proceso completo de Checkout como invitado

**File:** `tests/opencart/guest-checkout.spec.ts`

**Steps:**
  1. Navegar a https://opencart.abstracta.us:443/index.php?route=checkout/checkout
    - expect: La página de Checkout se carga correctamente
    - expect: El encabezado 'Checkout' es visible
  2. Seleccionar la opción 'Guest Checkout' en 'Step 1: Checkout Options'
    - expect: La opción de Guest Checkout está seleccionada
    - expect: El botón 'Continue' está habilitado
  3. Hacer clic en 'Continue' para avanzar a 'Step 2: Billing Details'
    - expect: Se muestra el formulario 'Step 2: Billing Details'
    - expect: Los campos obligatorios están visibles
  4. Completar 'Step 2: Billing Details' con datos válidos: nombre, apellido, email, teléfono, dirección, ciudad, código postal, país 'United Kingdom', región/estado
    - expect: Todos los campos obligatorios se llenan correctamente
    - expect: No hay mensajes de validación de error
  5. Verificar que 'My delivery and billing addresses are the same.' esté marcado
    - expect: La casilla de mismo domicilio está activa
  6. Hacer clic en 'Continue' dentro de 'Step 2: Billing Details'
    - expect: Se avanza a 'Step 3: Delivery Details'
    - expect: El panel de Delivery Details está visible
  7. Hacer clic en 'Continue' dentro de 'Step 3: Delivery Details'
    - expect: Se avanza a 'Step 4: Delivery Method'
    - expect: La sección de método de entrega se muestra
  8. Seleccionar el método de entrega disponible en 'Step 4: Delivery Method'
    - expect: El método de entrega queda seleccionado
    - expect: No hay errores de selección
  9. Hacer clic en 'Continue' dentro de 'Step 4: Delivery Method'
    - expect: Se avanza a 'Step 5: Payment Method'
    - expect: La sección de pago es visible
  10. Seleccionar el método de pago disponible en 'Step 5: Payment Method'
    - expect: El método de pago queda seleccionado
  11. Marcar la casilla de términos y condiciones en 'Step 5: Payment Method'
    - expect: Los términos y condiciones están aceptados
    - expect: El botón 'Continue' está habilitado
  12. Hacer clic en 'Continue' dentro de 'Step 5: Payment Method'
    - expect: Se avanza a 'Step 6: Confirm Order'
    - expect: El resumen de pedido es visible
  13. Validar el resumen del pedido en 'Step 6: Confirm Order'
    - expect: El total del pedido y los productos pedidos son correctos
    - expect: No hay errores de resumen
  14. Hacer clic en 'Confirm Order' en 'Step 6: Confirm Order'
    - expect: La orden se procesa
    - expect: La página muestra el mensaje 'Your order has been placed!'
  15. Verificar el mensaje de éxito 'Your order has been placed!'
    - expect: El mensaje de confirmación está visible
    - expect: El proceso de checkout finaliza correctamente

#### 1.2. Compra de iMac y checkout completo

**File:** `tests/opencart/guest-checkout.spec.ts`

**Steps:**
  1. Navegar a https://opencart.abstracta.us
    - expect: La página principal de OpenCart se carga correctamente
    - expect: El encabezado o logo de OpenCart es visible
  2. Seleccionar la categoría 'Desktops' y luego 'Mac'
    - expect: La categoría 'Desktops' está abierta
    - expect: La subcategoría 'Mac' se muestra y es seleccionada
  3. Hacer clic en el producto 'iMac'
    - expect: Se abre la página de detalles del producto iMac
    - expect: El título del producto iMac es visible
  4. Hacer clic en 'Add to Cart' para agregar iMac al carrito
    - expect: El producto se añade al carrito
    - expect: Aparece un mensaje de confirmación de agregación al carrito
  5. Validar que el producto se añadió correctamente
    - expect: El carrito muestra el producto iMac
    - expect: El mensaje de éxito del carrito es visible
  6. Ir a 'Shopping Cart'
    - expect: La página de Shopping Cart se carga correctamente
    - expect: El producto iMac aparece en el carrito
  7. Completar el proceso de Checkout exitosamente desde el carrito
    - expect: La página de Checkout se carga
    - expect: El flujo de guest checkout permite avanzar hasta la confirmación de Pedido
