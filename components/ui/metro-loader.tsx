'use client'

import { cn } from '@/lib/utils'

export function MetroLoader({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-2", className)}>
      {/* Metro line animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent animate-metro-line" />
      
      {/* Station dots */}
      <div className="absolute inset-0 flex justify-between">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-background border-2 border-primary animate-station-pulse"
            style={{
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}

// Add this to your tailwind.config.ts under theme.extend.keyframes
const metroAnimations = {
  'metro-line': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' }
  },
  'station-pulse': {
    '0%, 100%': { transform: 'scale(1)', opacity: '1' },
    '50%': { transform: 'scale(1.5)', opacity: '0.5' }
  }
}

// Add this under theme.extend.animation
const animations = {
  'metro-line': 'metro-line 2s infinite',
  'station-pulse': 'station-pulse 1.5s infinite'
}
