// src/components/analytics/LogVisit.tsx
'use client'
import { useEffect } from 'react'
import { logEvent } from '@/lib/event-logger'

export function LogVisit() {
  useEffect(() => {
    logEvent({
      type: 'visit_menu',
      metadata: {
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        referrer: typeof document !== 'undefined' ? document.referrer : ''
      }
    })
  }, [logEvent])
  return null
}
