import { MetricName, getRating, Metric } from './metrics'

export function onFCP(metric: Metric) {
  // Measure First Contentful Paint
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries()
    if (entries.length > 0) {
      const entry = entries[entries.length - 1]
      const value = entry.startTime
      reportMetric({
        name: 'FCP',
        value,
        rating: getRating('FCP', value)
      })
    }
  }).observe({ entryTypes: ['paint'] })
}

export function onLCP(metric: Metric) {
  // Measure Largest Contentful Paint
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries()
    if (entries.length > 0) {
      const entry = entries[entries.length - 1]
      const value = entry.startTime
      reportMetric({
        name: 'LCP',
        value,
        rating: getRating('LCP', value)
      })
    }
  }).observe({ entryTypes: ['largest-contentful-paint'] })
}

export function onFID(metric: Metric) {
  // Measure First Input Delay
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries()
    entries.forEach((entry) => {
      if (entry instanceof PerformanceEventTiming) {
        const value = entry.processingStart - entry.startTime
        reportMetric({
          name: 'FID',
          value,
          rating: getRating('FID', value)
        })
      }
    })
  }).observe({ entryTypes: ['first-input'] })
}

export function onINP(metric: Metric) {
  // Measure Interaction to Next Paint
  let maxINP = 0
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries()
    entries.forEach((entry) => {
      if (entry instanceof PerformanceEventTiming) {
        const value = entry.duration
        maxINP = Math.max(maxINP, value)
        reportMetric({
          name: 'INP',
          value: maxINP,
          rating: getRating('INP', maxINP)
        })
      }
    })
  }).observe({ entryTypes: ['event'] })
}

export function onCLS(metric: Metric) {
  // Measure Cumulative Layout Shift
  let clsValue = 0
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries()
    entries.forEach((entry) => {
      if (!entry.hadRecentInput) {
        clsValue += (entry as any).value
        reportMetric({
          name: 'CLS',
          value: clsValue,
          rating: getRating('CLS', clsValue)
        })
      }
    })
  }).observe({ entryTypes: ['layout-shift'] })
}

function reportMetric(metric: Metric) {
  // Send to analytics
  if (window.gtag) {
    window.gtag('event', 'web_vital', {
      metric_name: metric.name,
      value: metric.value,
      rating: metric.rating
    })
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Web Vital: ${metric.name}`, {
      value: metric.value,
      rating: metric.rating
    })
  }

  // You can also send to your own analytics service
  // Example: send to custom endpoint
  fetch('/api/metrics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(metric)
  }).catch(console.error)
}
