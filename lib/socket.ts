import { io, Socket } from 'socket.io-client'

class SocketService {
  private static instance: SocketService
  private socket: Socket | null = null
  private subscribers: Map<string, Set<Function>> = new Map()

  private constructor() {
    this.initSocket()
  }

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService()
    }
    return SocketService.instance
  }

  private initSocket() {
    this.socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:3001', {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server')
    })

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server')
    })

    // Handle real-time transaction updates
    this.socket.on('transaction', (data) => {
      this.notifySubscribers('transaction', data)
    })

    // Handle account balance updates
    this.socket.on('balance', (data) => {
      this.notifySubscribers('balance', data)
    })

    // Handle notifications
    this.socket.on('notification', (data) => {
      this.notifySubscribers('notification', data)
      this.showPushNotification(data)
    })
  }

  private async showPushNotification(data: any) {
    if ('Notification' in window && Notification.permission === 'granted') {
      const { title, message } = data
      new Notification(title, {
        body: message,
        icon: '/icons/icon-192x192.png'
      })
    }
  }

  subscribe(event: string, callback: Function) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, new Set())
    }
    this.subscribers.get(event)?.add(callback)
  }

  unsubscribe(event: string, callback: Function) {
    this.subscribers.get(event)?.delete(callback)
  }

  private notifySubscribers(event: string, data: any) {
    this.subscribers.get(event)?.forEach(callback => callback(data))
  }

  // Methods for sending data
  sendTransaction(data: any) {
    this.socket?.emit('transaction', data)
  }

  updateBalance(data: any) {
    this.socket?.emit('balance', data)
  }

  disconnect() {
    this.socket?.disconnect()
  }
}

export const socketService = SocketService.getInstance()
