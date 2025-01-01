import { socketService } from '@/lib/socket'

describe('SocketService', () => {
  let mockCallback: jest.Mock

  beforeEach(() => {
    mockCallback = jest.fn()
  })

  it('should be a singleton', () => {
    const instance1 = socketService
    const instance2 = socketService
    expect(instance1).toBe(instance2)
  })

  it('should handle subscriptions correctly', () => {
    socketService.subscribe('test-event', mockCallback)
    
    // Simulate an event
    const testData = { message: 'test' }
    socketService['notifySubscribers']('test-event', testData)
    
    expect(mockCallback).toHaveBeenCalledWith(testData)
  })

  it('should handle unsubscriptions correctly', () => {
    socketService.subscribe('test-event', mockCallback)
    socketService.unsubscribe('test-event', mockCallback)
    
    // Simulate an event
    const testData = { message: 'test' }
    socketService['notifySubscribers']('test-event', testData)
    
    expect(mockCallback).not.toHaveBeenCalled()
  })

  it('should handle multiple subscribers for the same event', () => {
    const mockCallback2 = jest.fn()
    
    socketService.subscribe('test-event', mockCallback)
    socketService.subscribe('test-event', mockCallback2)
    
    const testData = { message: 'test' }
    socketService['notifySubscribers']('test-event', testData)
    
    expect(mockCallback).toHaveBeenCalledWith(testData)
    expect(mockCallback2).toHaveBeenCalledWith(testData)
  })

  it('should not notify unrelated subscribers', () => {
    socketService.subscribe('test-event', mockCallback)
    
    const testData = { message: 'test' }
    socketService['notifySubscribers']('other-event', testData)
    
    expect(mockCallback).not.toHaveBeenCalled()
  })
})
