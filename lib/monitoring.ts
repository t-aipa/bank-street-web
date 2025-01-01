interface PerformanceMetrics {
  fcp: number // First Contentful Paint
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
  ttfb: number // Time to First Byte
  navigationTiming: {
    dns: number
    tcp: number
    ssl: number
    ttfb: number
    download: number
    domInteractive: number
    domComplete: number
  }
}

class PerformanceMonitoring {
  private static instance: PerformanceMonitoring

  private constructor() {
    this.initializeObservers()
  }

  static getInstance(): PerformanceMonitoring {
    if (!PerformanceMonitoring.instance) {
      PerformanceMonitoring.instance = new PerformanceMonitoring()
    }
    return PerformanceMonitoring.instance
  }

  private initializeObservers() {
    // Observe LCP
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const lastEntry = entries[entries.length - 1]
      this.reportMetric('lcp', lastEntry.startTime)
    }).observe({ entryTypes: ['largest-contentful-paint'] })

    // Observe FID
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      entries.forEach((entry) => {
        if (entry instanceof PerformanceEventTiming) {
          this.reportMetric('fid', entry.processingStart - entry.startTime)
        }
      })
    }).observe({ entryTypes: ['first-input'] })

    // Observe CLS
    let clsValue = 0
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
          this.reportMetric('cls', clsValue)
        }
      })
    }).observe({ entryTypes: ['layout-shift'] })

    // Observe Navigation Timing
    this.observeNavigationTiming()
  }

  private observeNavigationTiming() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

        if (navigation) {
          const timing = {
            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp: navigation.connectEnd - navigation.connectStart,
            ssl: navigation.secureConnectionStart > 0 ? 
              navigation.connectEnd - navigation.secureConnectionStart : 0,
            ttfb: navigation.responseStart - navigation.requestStart,
            download: navigation.responseEnd - navigation.responseStart,
            domInteractive: navigation.domInteractive - navigation.responseEnd,
            domComplete: navigation.domComplete - navigation.responseEnd
          }

          this.reportNavigationTiming(timing)
        }
      }, 0)
    })
  }

  private reportMetric(name: keyof PerformanceMetrics, value: number) {
    // Send to analytics service
    console.log(`Performance metric - ${name}:`, value)

    // You can implement your own analytics service here
    // Example: send to Google Analytics
    if (window.gtag) {
      window.gtag('event', 'performance_metric', {
        metric_name: name,
        value: value
      })
    }
  }

  private reportNavigationTiming(timing: PerformanceMetrics['navigationTiming']) {
    Object.entries(timing).forEach(([key, value]) => {
      this.reportMetric(key as keyof PerformanceMetrics, value)
    })
  }

  public getMetrics(): Promise<PerformanceMetrics> {
    return new Promise((resolve) => {
      // Wait for all metrics to be collected
      setTimeout(() => {
        const entries = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        
        resolve({
          fcp: this.getFCP(),
          lcp: this.getLCP(),
          fid: this.getFID(),
          cls: this.getCLS(),
          ttfb: entries ? entries.responseStart - entries.requestStart : 0,
          navigationTiming: {
            dns: entries ? entries.domainLookupEnd - entries.domainLookupStart : 0,
            tcp: entries ? entries.connectEnd - entries.connectStart : 0,
            ssl: entries && entries.secureConnectionStart > 0 ? 
              entries.connectEnd - entries.secureConnectionStart : 0,
            ttfb: entries ? entries.responseStart - entries.requestStart : 0,
            download: entries ? entries.responseEnd - entries.responseStart : 0,
            domInteractive: entries ? entries.domInteractive - entries.responseEnd : 0,
            domComplete: entries ? entries.domComplete - entries.responseEnd : 0
          }
        })
      }, 3000) // Wait for metrics to be collected
    })
  }

  private getFCP(): number {
    const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0]
    return fcpEntry ? fcpEntry.startTime : 0
  }

  private getLCP(): number {
    const entries = performance.getEntriesByType('largest-contentful-paint')
    const lastEntry = entries[entries.length - 1]
    return lastEntry ? lastEntry.startTime : 0
  }

  private getFID(): number {
    const entries = performance.getEntriesByType('first-input')
    const firstEntry = entries[0]
    return firstEntry instanceof PerformanceEventTiming ? 
      firstEntry.processingStart - firstEntry.startTime : 0
  }

  private getCLS(): number {
    const entries = performance.getEntriesByType('layout-shift')
    return entries.reduce((sum, entry: any) => 
      entry.hadRecentInput ? sum : sum + entry.value, 0)
  }
}

export const performanceMonitoring = PerformanceMonitoring.getInstance()

// Add types for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}
