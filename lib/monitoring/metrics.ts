export interface MetricName {
  FCP: 'first-contentful-paint'
  LCP: 'largest-contentful-paint'
  FID: 'first-input-delay'
  CLS: 'cumulative-layout-shift'
  TTFB: 'time-to-first-byte'
  INP: 'interaction-to-next-paint'
  TBT: 'total-blocking-time'
}

export interface Metric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta?: number
}

export const thresholds = {
  FCP: {
    good: 1800,
    poor: 3000
  },
  LCP: {
    good: 2500,
    poor: 4000
  },
  FID: {
    good: 100,
    poor: 300
  },
  CLS: {
    good: 0.1,
    poor: 0.25
  },
  TTFB: {
    good: 800,
    poor: 1800
  },
  INP: {
    good: 200,
    poor: 500
  },
  TBT: {
    good: 200,
    poor: 600
  }
}

export function getRating(name: keyof typeof thresholds, value: number): Metric['rating'] {
  const threshold = thresholds[name]
  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}
