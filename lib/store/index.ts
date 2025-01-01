import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  user: {
    id: string
    name: string
    email: string
    image?: string
  } | null
  setUser: (user: UserState['user']) => void
}

interface BankState {
  selectedBank: {
    id: string
    name: string
    location: [number, number]
  } | null
  setSelectedBank: (bank: BankState['selectedBank']) => void
}

interface ChatState {
  messages: {
    id: string
    content: string
    role: 'user' | 'assistant'
    timestamp: number
  }[]
  addMessage: (message: Omit<ChatState['messages'][0], 'id' | 'timestamp'>) => void
  clearMessages: () => void
}

interface UIState {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const useStore = create<UserState & BankState & ChatState & UIState>()(
  persist(
    (set) => ({
      // User state
      user: null,
      setUser: (user) => set({ user }),

      // Bank state
      selectedBank: null,
      setSelectedBank: (bank) => set({ selectedBank: bank }),

      // Chat state
      messages: [],
      addMessage: (message) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              ...message,
              id: Math.random().toString(36).substring(7),
              timestamp: Date.now(),
            },
          ],
        })),
      clearMessages: () => set({ messages: [] }),

      // UI state
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'bank-street-storage',
    }
  )
)
