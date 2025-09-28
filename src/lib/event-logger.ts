// Function to log events in the "God's eye" system
//
// Ejemplos de uso:
// 1. Al entrar al menú (visitante)
// logEvent({ type: 'visit_menu', metadata: { userAgent: navigator.userAgent, referrer: document.referrer } })
//
// 2. Al agregar al carrito
// logEvent({ type: 'add_to_cart', productId: 'id-del-producto', metadata: { cantidad: 2 } })
//
// 3. Al ver el resumen (abrir sidebar del carrito)
// logEvent({ type: 'view_cart_sidebar' })
//
// 4. Al darle a pedir (hacer click en el botón de WhatsApp)
// logEvent({ type: 'click_whatsapp', metadata: { cart: [...productos] } })
//
// 5. Al seleccionar método de pago
// logEvent({ type: 'select_payment_method', metadata: { method: 'efectivo' } })
//
// 6. Al llenar el formulario de domicilio o pickup
// logEvent({ type: 'fill_address_form', metadata: { tipo: 'domicilio' } })
//
// 7. Al completar el pedido (cuando son sacados del menú digital para ser enviado al WhatsApp)
// logEvent({ type: 'complete_order', metadata: { cart: [...productos], total: 123 } })

export interface EventLogInput {
  type: string // Event type
  productId?: string // Related product (optional)
  categoryId?: string // Related category (optional)
  metadata?: Record<string, unknown> // Extra details (optional)
}

/**
 * Sends an event to the backend to be logged
 * @param eventData Event data
 */
export async function logEvent(eventData: EventLogInput) {
  try {
    await fetch('/api/log-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    })
  } catch (error) {
    console.error('Error logging event', error)
  }
}
