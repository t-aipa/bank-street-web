export enum AnalyticsEvent {
  // Page Views
  PAGE_VIEW = 'page_view',
  MODAL_VIEW = 'modal_view',

  // User Actions
  BUTTON_CLICK = 'button_click',
  FORM_SUBMIT = 'form_submit',
  LINK_CLICK = 'link_click',
  SEARCH = 'search',

  // Authentication
  LOGIN = 'login',
  LOGOUT = 'logout',
  SIGNUP = 'signup',
  PASSWORD_RESET = 'password_reset',

  // Transactions
  TRANSACTION_START = 'transaction_start',
  TRANSACTION_COMPLETE = 'transaction_complete',
  TRANSACTION_ERROR = 'transaction_error',

  // Product Interactions
  PRODUCT_VIEW = 'product_view',
  PRODUCT_COMPARE = 'product_compare',
  PRODUCT_APPLY = 'product_apply',

  // Feature Usage
  FEATURE_DISCOVERY = 'feature_discovery',
  FEATURE_USE = 'feature_use',
  FEATURE_ERROR = 'feature_error',

  // Performance
  PERFORMANCE_METRIC = 'performance_metric',
  ERROR_BOUNDARY = 'error_boundary',
  API_ERROR = 'api_error',

  // User Preferences
  THEME_CHANGE = 'theme_change',
  LANGUAGE_CHANGE = 'language_change',
  NOTIFICATION_TOGGLE = 'notification_toggle'
}

export interface AnalyticsEventData {
  eventName: AnalyticsEvent
  timestamp: number
  userId?: string
  sessionId?: string
  properties: Record<string, any>
  metrics?: Record<string, number>
}

class Analytics {
  private static instance: Analytics
  private initialized: boolean = false
  private queue: AnalyticsEventData[] = []

  private constructor() {}

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics()
    }
    return Analytics.instance
  }

  async initialize() {
    if (this.initialized) return

    // Process any queued events
    while (this.queue.length > 0) {
      const event = this.queue.shift()
      if (event) {
        await this.sendEvent(event)
      }
    }

    this.initialized = true
  }

  async trackEvent(
    eventName: AnalyticsEvent,
    properties: Record<string, any> = {},
    metrics: Record<string, number> = {}
  ) {
    const event: AnalyticsEventData = {
      eventName,
      timestamp: Date.now(),
      properties,
      metrics
    }

    if (!this.initialized) {
      this.queue.push(event)
      return
    }

    await this.sendEvent(event)
  }

  private async sendEvent(event: AnalyticsEventData) {
    // Send to multiple analytics services
    await Promise.all([
      this.sendToGoogleAnalytics(event),
      this.sendToMixpanel(event),
      this.sendToCustomBackend(event)
    ])
  }

  private async sendToGoogleAnalytics(event: AnalyticsEventData) {
    if (window.gtag) {
      window.gtag('event', event.eventName, {
        ...event.properties,
        ...event.metrics
      })
    }
  }

  private async sendToMixpanel(event: AnalyticsEventData) {
    if (window.mixpanel) {
      window.mixpanel.track(event.eventName, {
        ...event.properties,
        ...event.metrics
      })
    }
  }

  private async sendToCustomBackend(event: AnalyticsEventData) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      })
    } catch (error) {
      console.error('Error sending analytics event:', error)
    }
  }
}

export const analytics = Analytics.getInstance()

// Add types for analytics services
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    mixpanel?: {
      track: (event: string, properties?: any) => void
    }
  }
}
