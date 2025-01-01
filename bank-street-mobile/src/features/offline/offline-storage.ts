import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'
import { Queue } from './queue'

interface StorageItem {
  key: string
  value: any
  timestamp: number
  expiresIn?: number
}

export class OfflineStorage {
  private static instance: OfflineStorage
  private pendingQueue: Queue
  private syncInProgress: boolean = false

  private constructor() {
    this.pendingQueue = new Queue()
    this.initNetworkListener()
  }

  static getInstance(): OfflineStorage {
    if (!OfflineStorage.instance) {
      OfflineStorage.instance = new OfflineStorage()
    }
    return OfflineStorage.instance
  }

  private initNetworkListener() {
    NetInfo.addEventListener(state => {
      if (state.isConnected && !this.syncInProgress) {
        this.syncPendingOperations()
      }
    })
  }

  async store(key: string, value: any, expiresIn?: number): Promise<void> {
    const item: StorageItem = {
      key,
      value,
      timestamp: Date.now(),
      expiresIn
    }

    try {
      await AsyncStorage.setItem(key, JSON.stringify(item))
    } catch (error) {
      console.error('Error storing data:', error)
      throw error
    }
  }

  async retrieve<T>(key: string): Promise<T | null> {
    try {
      const data = await AsyncStorage.getItem(key)
      if (!data) return null

      const item: StorageItem = JSON.parse(data)
      
      if (item.expiresIn && Date.now() - item.timestamp > item.expiresIn) {
        await AsyncStorage.removeItem(key)
        return null
      }

      return item.value as T
    } catch (error) {
      console.error('Error retrieving data:', error)
      return null
    }
  }

  async queueOperation(operation: () => Promise<void>): Promise<void> {
    await this.pendingQueue.enqueue(operation)
    const state = await NetInfo.fetch()
    if (state.isConnected && !this.syncInProgress) {
      this.syncPendingOperations()
    }
  }

  private async syncPendingOperations(): Promise<void> {
    if (this.syncInProgress) return

    this.syncInProgress = true
    try {
      while (!this.pendingQueue.isEmpty()) {
        const operation = await this.pendingQueue.dequeue()
        if (operation) {
          await operation()
        }
      }
    } catch (error) {
      console.error('Error syncing operations:', error)
    } finally {
      this.syncInProgress = false
    }
  }

  async clearExpired(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys()
      for (const key of keys) {
        const data = await AsyncStorage.getItem(key)
        if (data) {
          const item: StorageItem = JSON.parse(data)
          if (item.expiresIn && Date.now() - item.timestamp > item.expiresIn) {
            await AsyncStorage.removeItem(key)
          }
        }
      }
    } catch (error) {
      console.error('Error clearing expired items:', error)
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear()
    } catch (error) {
      console.error('Error clearing storage:', error)
      throw error
    }
  }
}
