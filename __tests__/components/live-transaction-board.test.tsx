import { render, screen, waitFor } from '@testing-library/react'
import { LiveTransactionBoard } from '@/components/bank-station/live-transaction-board'
import { socketService } from '@/lib/socket'

// Mock the socket service
jest.mock('@/lib/socket', () => ({
  socketService: {
    subscribe: jest.fn(),
    unsubscribe: jest.fn()
  }
}))

describe('LiveTransactionBoard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the loading state initially', () => {
    render(<LiveTransactionBoard />)
    expect(screen.getByText('Live Transactions')).toBeInTheDocument()
    expect(screen.getByTestId('metro-loader')).toBeInTheDocument()
  })

  it('subscribes to transaction updates on mount', () => {
    render(<LiveTransactionBoard />)
    expect(socketService.subscribe).toHaveBeenCalledWith(
      'transaction',
      expect.any(Function)
    )
  })

  it('unsubscribes from transaction updates on unmount', () => {
    const { unmount } = render(<LiveTransactionBoard />)
    unmount()
    expect(socketService.unsubscribe).toHaveBeenCalledWith(
      'transaction',
      expect.any(Function)
    )
  })

  it('displays new transactions when they arrive', async () => {
    const mockTransaction = {
      id: '123',
      type: 'credit',
      amount: 100,
      description: 'Test Transaction',
      timestamp: new Date(),
      status: 'completed'
    }

    render(<LiveTransactionBoard />)

    // Simulate a new transaction arriving
    const subscribeCallback = (socketService.subscribe as jest.Mock).mock.calls[0][1]
    subscribeCallback(mockTransaction)

    await waitFor(() => {
      expect(screen.getByText('Test Transaction')).toBeInTheDocument()
      expect(screen.getByText('+$100.00')).toBeInTheDocument()
    })
  })
})
